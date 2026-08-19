import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError } from "@/lib/backend-proxy";
import { validKeywordResearchId } from "@/lib/keyword-intelligence-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPORT_TIMEOUT_MS = 30_000;
const MAX_FLAG_COUNT = 20;

const MARKET_VALUES = new Set([
  "all",
  "US",
  "GB",
  "CA",
  "AU",
  "NZ",
  "DE",
  "FR",
  "IN",
  "AE",
]);
const LANE_VALUES = new Set([
  "local_discovery",
  "brand_competitor",
  "store_discovery",
  "category_discovery",
]);
const SINGLE_VALUE_KEYS = new Set([
  "market",
  "seed",
  "clusterId",
  "intent",
  "lane",
  "category",
  "audience",
  "channel",
  "minVolume",
  "minOpportunity",
  "recommended",
  "search",
]);

function exportBackendBaseUrl(): string | null {
  const value = process.env.BACKEND_API_BASE_URL;
  if (!value || value.endsWith("/")) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return value;
  } catch {
    return null;
  }
}

function codePointLength(value: string): number {
  return [...value].length;
}

function isNonemptyAtMost(value: string, maxCodePoints: number): boolean {
  const length = codePointLength(value);
  return length >= 1 && length <= maxCodePoints;
}

function isValidSingleValue(name: string, value: string): boolean {
  switch (name) {
    case "market":
      return MARKET_VALUES.has(value);
    case "seed":
      return isNonemptyAtMost(value, 100);
    case "clusterId":
      return value.length >= 1;
    case "intent":
    case "category":
    case "audience":
    case "channel":
      return isNonemptyAtMost(value, 40);
    case "lane":
      return LANE_VALUES.has(value);
    case "minVolume":
      return /^\d+$/u.test(value) && Number(value) <= 2_147_483_647;
    case "minOpportunity":
      return /^\d+$/u.test(value) && Number(value) <= 100;
    case "recommended":
      return value === "true" || value === "false";
    case "search":
      return isNonemptyAtMost(value, 160);
    default:
      return false;
  }
}

function validateAndBuildExportQuery(
  source: URLSearchParams,
): URLSearchParams | null {
  const singles = new Map<string, string>();
  const flags: string[] = [];
  for (const [name, value] of source.entries()) {
    if (name === "flag") {
      if (flags.length >= MAX_FLAG_COUNT || !isNonemptyAtMost(value, 40)) {
        return null;
      }
      flags.push(value);
      continue;
    }
    if (!SINGLE_VALUE_KEYS.has(name) || singles.has(name)) {
      return null;
    }
    if (!isValidSingleValue(name, value)) {
      return null;
    }
    singles.set(name, value);
  }
  const params = new URLSearchParams();
  for (const [name, value] of singles) params.set(name, value);
  for (const flag of flags) params.append("flag", flag);
  return params;
}

export async function GET(
  _request: Request,
  context: RouteContext<"/api/keyword-research/[researchId]/export.csv">,
): Promise<Response> {
  const { researchId } = await context.params;
  if (!validKeywordResearchId(researchId)) {
    return jsonError(
      400,
      "INVALID_RESEARCH_ID",
      "The research ID is invalid.",
    );
  }

  const source = new URL(_request.url).searchParams;
  const query = validateAndBuildExportQuery(source);
  if (query === null) {
    return jsonError(
      400,
      "INVALID_QUERY_PARAMETERS",
      "One or more export query parameters are invalid.",
    );
  }

  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;

  const baseUrl = exportBackendBaseUrl();
  if (!baseUrl) {
    return jsonError(
      500,
      "FRONTEND_CONFIGURATION_ERROR",
      "The frontend is not connected to the lead service.",
    );
  }

  const queryString = query.toString();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EXPORT_TIMEOUT_MS);
  try {
    const response = await fetch(
      `${baseUrl}/api/keyword-research/${encodeURIComponent(researchId)}/export.csv${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          Accept: "text/csv,application/json",
          ...(process.env.BACKEND_API_TOKEN
            ? { Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}` }
            : {}),
          "X-User-Id": auth.userId,
        },
      },
    );

    const responseText = await response.text();
    if (response.ok) {
      const headers: Record<string, string> = {
        "Content-Type":
          response.headers.get("content-type") ?? "text/csv; charset=utf-8",
        "Cache-Control": "no-store",
      };
      const disposition = response.headers.get("content-disposition");
      if (disposition) headers["Content-Disposition"] = disposition;
      return new Response(responseText, { status: 200, headers });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(responseText);
    } catch {
      return jsonError(
        502,
        "BACKEND_INVALID_RESPONSE",
        "The backend returned an unreadable response. Please try again.",
      );
    }
    return Response.json(payload, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    if (controller.signal.aborted) {
      return jsonError(
        504,
        "BACKEND_TIMEOUT",
        "The backend did not respond in time. Please try again.",
      );
    }
    return jsonError(
      502,
      "BACKEND_UNAVAILABLE",
      "The lead service could not be reached. Please try again.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

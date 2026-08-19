import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import { validKeywordResearchId } from "@/lib/keyword-intelligence-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 262144;

export async function PUT(
  _request: Request,
  context: RouteContext<"/api/keyword-research/[researchId]/selection">,
): Promise<Response> {
  if (!_request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonError(
      415,
      "UNSUPPORTED_CONTENT_TYPE",
      "Content-Type must be application/json.",
    );
  }

  const body = await _request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    return jsonError(413, "REQUEST_TOO_LARGE", "The request body is too large.");
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return jsonError(400, "INVALID_JSON", "The request body is not valid JSON.");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return jsonError(
      400,
      "KEYWORD_SELECTION_INPUT_INVALID",
      "The selection payload is invalid.",
    );
  }
  const record = parsed as Record<string, unknown>;
  const keys = Object.keys(record);
  if (
    keys.length !== 2 ||
    !Number.isSafeInteger(record.expectedRevision) ||
    (record.expectedRevision as number) < 1 ||
    !Array.isArray(record.items) ||
    record.items.length > 200
  ) {
    return jsonError(
      400,
      "KEYWORD_SELECTION_INPUT_INVALID",
      "The selection payload is invalid.",
    );
  }

  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const { researchId } = await context.params;
  if (!validKeywordResearchId(researchId)) {
    return jsonError(
      400,
      "INVALID_RESEARCH_ID",
      "The research ID is invalid.",
    );
  }

  return proxyBackend({
    path: `/api/keyword-research/${encodeURIComponent(researchId)}/selection`,
    method: "PUT",
    body,
    timeoutMs: 15_000,
    userId: auth.userId,
  });
}

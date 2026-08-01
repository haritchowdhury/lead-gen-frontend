import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend, validRunId } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 128 * 1024;

export async function GET(
  _request: Request,
  context: RouteContext<"/api/runs/[runId]/queries">,
): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const { runId } = await context.params;
  if (!validRunId(runId)) {
    return jsonError(400, "INVALID_RUN_ID", "The run ID is invalid.");
  }
  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}/queries`,
    timeoutMs: 10_000,
    userId: auth.userId,
  });
}

export async function PUT(
  request: Request,
  context: RouteContext<"/api/runs/[runId]/queries">,
): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const { runId } = await context.params;
  if (!validRunId(runId)) {
    return jsonError(400, "INVALID_RUN_ID", "The run ID is invalid.");
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonError(415, "UNSUPPORTED_CONTENT_TYPE", "Content-Type must be application/json.");
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return jsonError(413, "REQUEST_TOO_LARGE", "The request body is too large.");
  }

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return jsonError(400, "INVALID_JSON", "The request body is not valid JSON.");
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return jsonError(400, "INVALID_REQUEST_BODY", "The request body is invalid.");
  }
  const source = value as Record<string, unknown>;
  if (
    Object.keys(source).some((key) => !["revision", "queries"].includes(key)) ||
    !Number.isSafeInteger(source.revision) ||
    Number(source.revision) < 0 ||
    !Array.isArray(source.queries)
  ) {
    return jsonError(400, "INVALID_REQUEST_BODY", "The request body is invalid.");
  }

  const queries = [];
  for (const item of source.queries) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return jsonError(400, "INVALID_REQUEST_BODY", "A query row is invalid.");
    }
    const row = item as Record<string, unknown>;
    if (
      Object.keys(row).some((key) => !["id", "categoryIndex", "query"].includes(key)) ||
      (row.id !== undefined && typeof row.id !== "string") ||
      !Number.isSafeInteger(row.categoryIndex) ||
      Number(row.categoryIndex) < 0 ||
      typeof row.query !== "string"
    ) {
      return jsonError(400, "INVALID_REQUEST_BODY", "A query row is invalid.");
    }
    queries.push({
      ...(typeof row.id === "string" ? { id: row.id } : {}),
      categoryIndex: row.categoryIndex,
      query: row.query,
    });
  }

  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}/queries`,
    method: "PUT",
    body: JSON.stringify({ revision: source.revision, queries }),
    timeoutMs: 15_000,
    userId: auth.userId,
  });
}

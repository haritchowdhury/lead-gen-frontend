import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend, validRunId } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: RouteContext<"/api/runs/[runId]/start">,
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
  if (new TextEncoder().encode(raw).byteLength > 32 * 1024) {
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
    Object.keys(source).some((key) => key !== "revision") ||
    !Number.isSafeInteger(source.revision) ||
    Number(source.revision) < 0
  ) {
    return jsonError(400, "INVALID_REQUEST_BODY", "A non-negative revision is required.");
  }
  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}/start`,
    method: "POST",
    body: JSON.stringify({ revision: source.revision }),
    timeoutMs: 15_000,
    userId: auth.userId,
  });
}

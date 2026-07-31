import {
  jsonError,
  proxyBackend,
  validRunId,
} from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/runs/[runId]">,
): Promise<Response> {
  const { runId } = await context.params;
  if (!validRunId(runId)) {
    return jsonError(400, "INVALID_RUN_ID", "The run ID is invalid.");
  }
  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}`,
    timeoutMs: 10_000,
  });
}


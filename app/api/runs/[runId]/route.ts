import {
  jsonError,
  proxyBackend,
  validRunId,
} from "@/lib/backend-proxy";
import { authenticatedRoute } from "@/lib/auth/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/runs/[runId]">,
): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const { runId } = await context.params;
  if (!validRunId(runId)) {
    return jsonError(400, "INVALID_RUN_ID", "The run ID is invalid.");
  }
  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}`,
    timeoutMs: 10_000,
    userId: auth.userId,
  });
}

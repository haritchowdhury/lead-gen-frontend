import {
  jsonError,
  proxyBackend,
  validRunId,
} from "@/lib/backend-proxy";
import { authenticatedRoute } from "@/lib/auth/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_PARAMETERS = new Set(["search", "discoveryQuery"]);

export async function GET(
  request: Request,
  context: { params: Promise<{ runId: string }> },
): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const { runId } = await context.params;
  if (!validRunId(runId)) {
    return jsonError(400, "INVALID_RUN_ID", "The run ID is invalid.");
  }

  const source = new URL(request.url).searchParams;
  const unknown = [...source.keys()].filter(
    (parameter) => !ALLOWED_PARAMETERS.has(parameter),
  );
  const duplicates = [...ALLOWED_PARAMETERS].filter(
    (parameter) => parameter !== "discoveryQuery" && source.getAll(parameter).length > 1,
  );
  if (unknown.length || duplicates.length) {
    return jsonError(
      400,
      "INVALID_QUERY_PARAMETERS",
      "One or more traffic overview query parameters are invalid.",
      { unknown, duplicates },
    );
  }

  const forwarded = new URLSearchParams();
  for (const parameter of ALLOWED_PARAMETERS) {
    for (const value of source.getAll(parameter)) forwarded.append(parameter, value);
  }
  const query = forwarded.toString();
  return proxyBackend({
    path: `/api/runs/${encodeURIComponent(runId)}/traffic-overview${query ? `?${query}` : ""}`,
    timeoutMs: 20_000,
    userId: auth.userId,
  });
}

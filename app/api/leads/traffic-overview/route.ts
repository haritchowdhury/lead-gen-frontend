import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const source = new URL(request.url).searchParams;
  const unknown = [...source.keys()].filter((key) => key !== "search");
  if (unknown.length || source.getAll("search").length > 1) {
    return jsonError(400, "INVALID_QUERY_PARAMETERS", "The traffic query parameters are invalid.");
  }
  return proxyBackend({
    path: `/api/leads/traffic-overview${source.size ? `?${source.toString()}` : ""}`,
    timeoutMs: 20_000,
    userId: auth.userId,
  });
}

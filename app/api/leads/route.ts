import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["page", "pageSize", "search", "sortBy", "sortDirection", "archived", "discoveryQuery"]);

export async function GET(request: Request): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;
  const source = new URL(request.url).searchParams;
  const unknown = [...source.keys()].filter((key) => !ALLOWED.has(key));
  const duplicates = [...ALLOWED].filter((key) => key !== "discoveryQuery" && source.getAll(key).length > 1);
  if (unknown.length || duplicates.length) {
    return jsonError(400, "INVALID_QUERY_PARAMETERS", "One or more lead query parameters are invalid.", { unknown, duplicates });
  }
  return proxyBackend({
    path: `/api/leads${source.size ? `?${source.toString()}` : ""}`,
    timeoutMs: 20_000,
    userId: auth.userId,
  });
}

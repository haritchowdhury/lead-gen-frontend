import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import { validKeywordResearchId } from "@/lib/keyword-intelligence-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/keyword-research/[researchId]">,
): Promise<Response> {
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
    path: `/api/keyword-research/${encodeURIComponent(researchId)}`,
    timeoutMs: 10_000,
    userId: auth.userId,
  });
}

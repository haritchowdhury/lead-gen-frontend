import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import { validateSeedsInput } from "@/lib/keyword-intelligence-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonError(
      415,
      "UNSUPPORTED_CONTENT_TYPE",
      "Content-Type must be application/json.",
    );
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    return jsonError(413, "REQUEST_TOO_LARGE", "The request body is too large.");
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return jsonError(400, "INVALID_JSON", "The request body is not valid JSON.");
  }

  const validated = validateSeedsInput(parsed);
  if (!validated.ok) {
    return jsonError(
      400,
      "KEYWORD_RESEARCH_INPUT_INVALID",
      "One to five research seed phrases are required.",
    );
  }

  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;

  return proxyBackend({
    path: "/api/keyword-research",
    method: "POST",
    body: JSON.stringify({ seeds: validated.seeds }),
    timeoutMs: 15_000,
    userId: auth.userId,
  });
}

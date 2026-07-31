import { jsonError, proxyBackend } from "@/lib/backend-proxy";

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
  try {
    JSON.parse(body);
  } catch {
    return jsonError(400, "INVALID_JSON", "The request body is not valid JSON.");
  }

  return proxyBackend({
    path: "/api/runs",
    method: "POST",
    body,
    timeoutMs: 15_000,
  });
}


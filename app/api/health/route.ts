import { proxyBackend } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return proxyBackend({ path: "/api/health", timeoutMs: 10_000 });
}


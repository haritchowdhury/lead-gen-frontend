import { cookies } from "next/headers";

import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PENDING_INTENT_COOKIE = "storesignal_pending_run_intent";
const INTENT_ID_PATTERN = /^intent_[A-Za-z0-9_-]{32}$/u;

export async function POST(): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;

  const cookieStore = await cookies();
  const intentId = cookieStore.get(PENDING_INTENT_COOKIE)?.value;
  if (!intentId || !INTENT_ID_PATTERN.test(intentId)) {
    if (intentId) cookieStore.delete(PENDING_INTENT_COOKIE);
    return jsonError(
      404,
      "RUN_INTENT_NOT_FOUND",
      "There is no pending search to continue.",
    );
  }

  const response = await proxyBackend({
    path: `/api/run-intents/${encodeURIComponent(intentId)}/claim`,
    method: "POST",
    timeoutMs: 15_000,
    userId: auth.userId,
  });
  if (response.ok || response.status === 404) {
    cookieStore.delete(PENDING_INTENT_COOKIE);
  }
  return response;
}

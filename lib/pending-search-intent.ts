export const PENDING_RUN_INTENT_COOKIE = "storesignal_pending_run_intent";
export const PENDING_KEYWORD_RESEARCH_INTENT_COOKIE =
  "storesignal_pending_keyword_research_intent";

export const PENDING_INTENT_ID_PATTERN = /^intent_[A-Za-z0-9_-]{32}$/u;

export function pendingIntentMaxAge(
  expiresAt: string,
  nowMs: number = Date.now(),
): number | null {
  const expiresAtMs = new Date(expiresAt).getTime();
  if (
    !Number.isFinite(expiresAtMs) ||
    !Number.isFinite(nowMs) ||
    expiresAtMs <= nowMs
  ) return null;
  return Math.max(1, Math.min(3_600, Math.floor((expiresAtMs - nowMs) / 1_000)));
}

export function pendingIntentCookieOptions(maxAge: number): {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

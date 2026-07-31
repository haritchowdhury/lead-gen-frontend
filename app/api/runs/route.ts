import { cookies } from "next/headers";

import { sessionUserId } from "@/lib/auth/server";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import type { RunIntentResponse } from "@/lib/api-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;
const PENDING_INTENT_COOKIE = "storesignal_pending_run_intent";
const INTENT_ID_PATTERN = /^intent_[A-Za-z0-9_-]{32}$/u;

export async function GET(request: Request): Promise<Response> {
  let userId: string | null;
  try {
    userId = await sessionUserId();
  } catch {
    return jsonError(
      503,
      "AUTH_UNAVAILABLE",
      "Authentication is temporarily unavailable. Please try again.",
    );
  }
  if (!userId) {
    return jsonError(401, "AUTHENTICATION_REQUIRED", "Sign in to view your runs.");
  }

  const source = new URL(request.url).searchParams;
  const allowed = new Set(["page", "pageSize"]);
  const unknown = [...source.keys()].filter((key) => !allowed.has(key));
  const duplicates = [...allowed].filter((key) => source.getAll(key).length > 1);
  if (unknown.length || duplicates.length) {
    return jsonError(
      400,
      "INVALID_QUERY_PARAMETERS",
      "One or more run-list query parameters are invalid.",
    );
  }
  const forwarded = new URLSearchParams();
  for (const key of allowed) {
    const value = source.get(key);
    if (value !== null) forwarded.set(key, value);
  }
  const query = forwarded.toString();
  return proxyBackend({
    path: `/api/runs${query ? `?${query}` : ""}`,
    timeoutMs: 10_000,
    userId,
  });
}

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

  let userId: string | null;
  try {
    userId = await sessionUserId();
  } catch {
    return jsonError(
      503,
      "AUTH_UNAVAILABLE",
      "Authentication is temporarily unavailable. Please try again.",
    );
  }

  if (userId) {
    return proxyBackend({
      path: "/api/runs",
      method: "POST",
      body,
      timeoutMs: 15_000,
      userId,
    });
  }

  const intentResponse = await proxyBackend({
    path: "/api/run-intents",
    method: "POST",
    body,
    timeoutMs: 15_000,
  });
  if (!intentResponse.ok) return intentResponse;

  let intent: RunIntentResponse;
  try {
    intent = (await intentResponse.clone().json()) as RunIntentResponse;
  } catch {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an unreadable response. Please try again.",
    );
  }
  const expiresAt = Date.parse(intent.expiresAt);
  if (
    !INTENT_ID_PATTERN.test(intent.intentId) ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now()
  ) {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an invalid pending search. Please try again.",
    );
  }

  const maxAge = Math.max(
    1,
    Math.min(3600, Math.floor((expiresAt - Date.now()) / 1000)),
  );
  (await cookies()).set(PENDING_INTENT_COOKIE, intent.intentId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return jsonError(
    401,
    "AUTHENTICATION_REQUIRED",
    "Create an account or sign in to start this search.",
    { continueUrl: "/sign-up" },
  );
}

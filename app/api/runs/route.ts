import { cookies } from "next/headers";

import { sessionUserId } from "@/lib/auth/server";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import type { RunIntentResponse } from "@/lib/api-types";
import { parseRunIntentResponse } from "@/lib/api-validation";
import {
  PENDING_INTENT_ID_PATTERN,
  PENDING_KEYWORD_RESEARCH_INTENT_COOKIE,
  PENDING_RUN_INTENT_COOKIE,
  pendingIntentCookieOptions,
  pendingIntentMaxAge,
} from "@/lib/pending-search-intent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;
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
  if (intentResponse.status !== 201) {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an unreadable response. Please try again.",
    );
  }

  let intent: RunIntentResponse;
  try {
    const payload: unknown = await intentResponse.clone().json();
    if (
      !payload ||
      typeof payload !== "object" ||
      Array.isArray(payload) ||
      Object.keys(payload).sort().join("\0") !== "expiresAt\0intentId"
    ) {
      throw new Error("unexpected intent envelope");
    }
    intent = parseRunIntentResponse(payload);
  } catch {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an unreadable response. Please try again.",
    );
  }
  const maxAge = pendingIntentMaxAge(intent.expiresAt);
  if (!PENDING_INTENT_ID_PATTERN.test(intent.intentId) || maxAge === null) {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an invalid pending search. Please try again.",
    );
  }

  const cookieStore = await cookies();
  cookieStore.delete(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE);
  cookieStore.set(
    PENDING_RUN_INTENT_COOKIE,
    intent.intentId,
    pendingIntentCookieOptions(maxAge),
  );
  return jsonError(
    401,
    "AUTHENTICATION_REQUIRED",
    "Create an account or sign in to start this search.",
    { continueUrl: "/sign-up" },
  );
}

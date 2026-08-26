import { cookies } from "next/headers";

import { parseResearchEnvelope, parseStartRunResponse } from "@/lib/api-validation";
import { authenticatedRoute } from "@/lib/auth/route";
import { jsonError, proxyBackend } from "@/lib/backend-proxy";
import type { SearchContinuationResponse } from "@/lib/api-types";
import {
  PENDING_INTENT_ID_PATTERN,
  PENDING_KEYWORD_RESEARCH_INTENT_COOKIE,
  PENDING_RUN_INTENT_COOKIE,
} from "@/lib/pending-search-intent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const auth = await authenticatedRoute();
  if (auth.response) return auth.response;

  const cookieStore = await cookies();
  const keywordIntentCookie = cookieStore.get(
    PENDING_KEYWORD_RESEARCH_INTENT_COOKIE,
  );
  const runIntentCookie = cookieStore.get(PENDING_RUN_INTENT_COOKIE);
  const keywordIntent = keywordIntentCookie?.value;
  const runIntent = runIntentCookie?.value;

  const validKeywordIntent = keywordIntent &&
    PENDING_INTENT_ID_PATTERN.test(keywordIntent)
    ? keywordIntent
    : null;
  const validRunIntent = runIntent && PENDING_INTENT_ID_PATTERN.test(runIntent)
    ? runIntent
    : null;
  if (keywordIntentCookie !== undefined && !validKeywordIntent) {
    cookieStore.delete(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE);
  }
  if (runIntentCookie !== undefined && !validRunIntent) {
    cookieStore.delete(PENDING_RUN_INTENT_COOKIE);
  }

  const selected = validKeywordIntent
    ? {
        kind: "keyword_research" as const,
        cookie: PENDING_KEYWORD_RESEARCH_INTENT_COOKIE,
        path: `/api/keyword-research-intents/${encodeURIComponent(validKeywordIntent)}/claim`,
      }
    : validRunIntent
      ? {
          kind: "legacy_run" as const,
          cookie: PENDING_RUN_INTENT_COOKIE,
          path: `/api/run-intents/${encodeURIComponent(validRunIntent)}/claim`,
        }
      : null;

  if (!selected) {
    return jsonError(
      404,
      "RUN_INTENT_NOT_FOUND",
      "There is no pending search to continue.",
    );
  }

  const response = await proxyBackend({
    path: selected.path,
    method: "POST",
    timeoutMs: 15_000,
    userId: auth.userId,
  });
  if (!response.ok) {
    if (response.status === 404) cookieStore.delete(selected.cookie);
    return response;
  }
  if (response.status !== 200 && response.status !== 201) {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an unreadable response. Please try again.",
    );
  }

  let continuation: SearchContinuationResponse;
  try {
    const payload: unknown = await response.clone().json();
    if (selected.kind === "keyword_research") {
      continuation = {
        kind: "keyword_research",
        research: parseResearchEnvelope(payload),
      };
    } else {
      if (
        !payload ||
        typeof payload !== "object" ||
        Array.isArray(payload) ||
        Object.keys(payload).sort().join("\0") !==
          "createdAt\0phase\0queriesUrl\0resultsUrl\0runId\0stage\0state\0statusUrl"
      ) {
        throw new Error("unexpected run envelope");
      }
      continuation = { kind: "legacy_run", run: parseStartRunResponse(payload) };
    }
  } catch {
    return jsonError(
      502,
      "BACKEND_INVALID_RESPONSE",
      "The backend returned an unreadable response. Please try again.",
    );
  }

  cookieStore.delete(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE);
  cookieStore.delete(PENDING_RUN_INTENT_COOKIE);
  return Response.json(continuation, {
    status: response.status,
    headers: { "Cache-Control": "no-store" },
  });
}

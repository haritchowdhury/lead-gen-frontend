import type { ApiErrorPayload } from "@/lib/api-types";
import { isApiErrorPayload } from "@/lib/api-validation";
import { parseResearchEnvelope, parseRunHandoffEnvelope } from "./keyword-intelligence-validation";
import type { KeywordResearchRunResponse, ResearchView, SelectionItem, SelectionMutationItem } from "./keyword-intelligence-types";

export class ApiRequestError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.error.message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = payload.error.code;
    this.details = payload.error.details;
  }
}

export async function apiRequest<T>(
  input: string,
  init: RequestInit = {},
  parse: (payload: unknown) => T,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an unreadable response.");
  }

  if (!response.ok) {
    if (isApiErrorPayload(payload)) {
      throw new ApiRequestError(response.status, payload);
    }
    throw new Error("The request could not be completed.");
  }

  return parse(payload);
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

function toSelectionMutation(items: SelectionItem[]): SelectionMutationItem[] {
  return items.map((item) => {
    if (item.sourceKind === "calculated") {
      if (typeof item.sourceKeywordId !== "string" || item.sourceKeywordId.length === 0)
        throw new Error("calculated selection item requires a source id");
      return { sourceKind: "calculated", sourceKeywordId: item.sourceKeywordId, keyword: item.keyword };
    }
    return { sourceKind: "manual", keyword: item.keyword };
  });
}

export async function createKeywordResearch(seeds: string[]): Promise<ResearchView> {
  return apiRequest<ResearchView>(
    "/api/keyword-research",
    { method: "POST", body: JSON.stringify({ seeds }), headers: { "Content-Type": "application/json" } },
    parseResearchEnvelope,
  );
}

export async function getKeywordResearch(researchId: string): Promise<ResearchView> {
  return apiRequest<ResearchView>(
    `/api/keyword-research/${encodeURIComponent(researchId)}`,
    { method: "GET" },
    parseResearchEnvelope,
  );
}

export async function saveKeywordSelection(
  researchId: string,
  expectedRevision: number,
  items: SelectionItem[],
): Promise<ResearchView> {
  return apiRequest<ResearchView>(
    `/api/keyword-research/${encodeURIComponent(researchId)}/selection`,
    {
      method: "PUT",
      body: JSON.stringify({ expectedRevision, items: toSelectionMutation(items) }),
      headers: { "Content-Type": "application/json" },
    },
    parseResearchEnvelope,
  );
}

export async function startKeywordResearchRun(
  researchId: string,
  expectedSelectionRevision: number,
  clientRequestId: string,
): Promise<KeywordResearchRunResponse> {
  return apiRequest<KeywordResearchRunResponse>(
    `/api/keyword-research/${encodeURIComponent(researchId)}/runs`,
    {
      method: "POST",
      body: JSON.stringify({ expectedSelectionRevision, clientRequestId }),
      headers: { "Content-Type": "application/json" },
    },
    parseRunHandoffEnvelope,
  );
}

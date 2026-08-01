import type { ApiErrorPayload } from "@/lib/api-types";
import { isApiErrorPayload } from "@/lib/api-validation";

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

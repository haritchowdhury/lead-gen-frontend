import "server-only";

import type { ApiErrorPayload } from "@/lib/api-types";

type ProxyOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT";
  body?: string;
  timeoutMs: number;
  userId?: string;
};

export function jsonError(
  status: number,
  code: string,
  message: string,
  details?: unknown,
): Response {
  const payload: ApiErrorPayload = {
    error: { code, message, ...(details === undefined ? {} : { details }) },
  };
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function backendBaseUrl(): string | null {
  const value = process.env.BACKEND_API_BASE_URL;
  if (!value || value.endsWith("/")) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return value;
  } catch {
    return null;
  }
}

export async function proxyBackend({
  path,
  method = "GET",
  body,
  timeoutMs,
  userId,
}: ProxyOptions): Promise<Response> {
  const baseUrl = backendBaseUrl();
  if (!baseUrl) {
    return jsonError(
      500,
      "FRONTEND_CONFIGURATION_ERROR",
      "The frontend is not connected to the lead service.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      body,
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(process.env.BACKEND_API_TOKEN
          ? { Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}` }
          : {}),
        ...(userId ? { "X-User-Id": userId } : {}),
      },
    });

    const responseText = await response.text();
    let payload: unknown;
    try {
      payload = JSON.parse(responseText);
    } catch {
      return jsonError(
        502,
        "BACKEND_INVALID_RESPONSE",
        "The backend returned an unreadable response. Please try again.",
      );
    }
    return Response.json(payload, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    if (controller.signal.aborted) {
      return jsonError(
        504,
        "BACKEND_TIMEOUT",
        "The backend did not respond in time. Please try again.",
      );
    }
    return jsonError(
      502,
      "BACKEND_UNAVAILABLE",
      "The lead service could not be reached. Please try again.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const RUN_ID_PATTERN = /^run_[A-Za-z0-9_-]{16,80}$/u;

export function validRunId(runId: string): boolean {
  return RUN_ID_PATTERN.test(runId);
}

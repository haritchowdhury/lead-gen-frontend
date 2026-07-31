import "server-only";

import { sessionUserId } from "@/lib/auth/server";
import { jsonError } from "@/lib/backend-proxy";

export type AuthenticatedRoute =
  | { userId: string; response?: never }
  | { userId?: never; response: Response };

export async function authenticatedRoute(): Promise<AuthenticatedRoute> {
  try {
    const userId = await sessionUserId();
    if (!userId) {
      return {
        response: jsonError(
          401,
          "AUTHENTICATION_REQUIRED",
          "Sign in to access this resource.",
        ),
      };
    }
    return { userId };
  } catch {
    return {
      response: jsonError(
        503,
        "AUTH_UNAVAILABLE",
        "Authentication is temporarily unavailable. Please try again.",
      ),
    };
  }
}

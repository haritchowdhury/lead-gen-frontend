import "server-only";

import { createNeonAuth, type NeonAuth } from "@neondatabase/auth/next/server";

let authInstance: NeonAuth | null = null;

export class AuthConfigurationError extends Error {
  constructor() {
    super("Neon Auth is not configured");
    this.name = "AuthConfigurationError";
  }
}

export function getAuth(): NeonAuth {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl || !URL.canParse(baseUrl) || !secret || secret.length < 32) {
    throw new AuthConfigurationError();
  }
  authInstance ??= createNeonAuth({
    baseUrl,
    cookies: { secret, sameSite: "lax" },
  });
  return authInstance;
}

export async function sessionUserId(): Promise<string | null> {
  const { data, error } = await getAuth().getSession();
  if (error) throw new Error("Authentication service unavailable");
  const userId = data?.user?.id;
  return typeof userId === "string" && userId ? userId : null;
}

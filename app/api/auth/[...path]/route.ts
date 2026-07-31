import { getAuth } from "@/lib/auth/server";
import { jsonError } from "@/lib/backend-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AuthRouteContext = {
  params: Promise<{ path: string[] }>;
};

const ALLOWED_AUTH_OPERATIONS = new Set([
  "GET:get-session",
  "POST:sign-in/email",
  "POST:sign-out",
  "POST:sign-up/email",
]);

async function handle(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  request: Request,
  context: AuthRouteContext,
): Promise<Response> {
  try {
    const { path } = await context.params;
    if (!ALLOWED_AUTH_OPERATIONS.has(`${method}:${path.join("/")}`)) {
      return jsonError(404, "NOT_FOUND", "The requested endpoint was not found.");
    }
    return await getAuth().handler()[method](request, context);
  } catch {
    return jsonError(
      503,
      "AUTH_UNAVAILABLE",
      "Authentication is temporarily unavailable or not configured.",
    );
  }
}

export const GET = (request: Request, context: AuthRouteContext) =>
  handle("GET", request, context);
export const POST = (request: Request, context: AuthRouteContext) =>
  handle("POST", request, context);
export const PUT = (request: Request, context: AuthRouteContext) =>
  handle("PUT", request, context);
export const PATCH = (request: Request, context: AuthRouteContext) =>
  handle("PATCH", request, context);
export const DELETE = (request: Request, context: AuthRouteContext) =>
  handle("DELETE", request, context);

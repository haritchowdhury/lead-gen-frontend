import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getAuth } from "@/lib/auth/server";

export default async function proxy(request: NextRequest) {
  try {
    return await getAuth().middleware({ loginUrl: "/sign-in" })(request);
  } catch {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/runs/:path*"],
};

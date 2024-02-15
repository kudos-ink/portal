import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import csrf from "edge-csrf";

// initalize protection function
const csrfProtect = csrf({
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
});

export const withCSRF: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const response = NextResponse.next();
    if (req.nextUrl.pathname.startsWith("/api/revalidate")) {
      return next(req, _next);
    }
    const csrfError = await csrfProtect(req, response);
    if (csrfError) {
      return new NextResponse("invalid csrf token", { status: 403 });
    }
    if (req.nextUrl.pathname === "/csrf-token") {
      return NextResponse.json({
        csrfToken: response.headers.get("X-CSRF-Token") || "missing",
      });
    }
    return next(req, _next);
  };
};

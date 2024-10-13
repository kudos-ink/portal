import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";

const [AUTH_USER, AUTH_PASS] = process.env.HTTP_BASIC_AUTH!.split(":");

export const withBasicAuthorization: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if (req.nextUrl.pathname.startsWith("/api/revalidate")) {
      if (!isAuthenticated(req)) {
        return new NextResponse("Authentication required", {
          status: 401,
          headers: { "WWW-Authenticate": "Basic" },
        });
      }
    }
    return next(req, _next);
  };
};

function isAuthenticated(req: NextRequest) {
  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authheader) {
    return false;
  }
  const values = authheader.split(" ");

  if (values.length != 2) {
    return false;
  }

  if (values[0] != "Basic") {
    return false;
  }

  const auth = Buffer.from(values[1], "base64").toString().split(":");

  if (auth.length != 2) {
    return false;
  }

  const user = auth[0];
  const pass = auth[1];

  return user == AUTH_USER && pass == AUTH_PASS;
}

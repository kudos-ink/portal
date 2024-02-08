import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const [AUTH_USER, AUTH_PASS] = process.env.HTTP_BASIC_AUTH!.split(":");

export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return NextResponse.next();
}

function isAuthenticated(req: NextRequest) {
  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  console.log(authheader);

  if (!authheader) {
    return false;
  }
  const values = authheader.split(" ");
  console.log(values);

  if (values.length != 2) {
    return false;
  }

  if (values[0] != "Basic") {
    return false;
  }

  const auth = Buffer.from(values[1], "base64").toString().split(":");

  console.log(auth);

  if (auth.length != 2) {
    return false;
  }

  const user = auth[0];
  const pass = auth[1];

  console.log(user, AUTH_USER);
  console.log(pass, AUTH_PASS);

  return user == AUTH_USER && pass == AUTH_PASS;
}

export const config = {
  matcher: "/api/revalidate/:path*",
};

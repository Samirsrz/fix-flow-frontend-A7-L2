import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, ROLE_HOME } from "@/lib/constants/auth";
import { Role } from "./shared/types/api";
import { readSession } from "./lib/auth/session";

const PROTECTED: { prefix: string; role: Role }[] = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/manager", role: "MANAGER" },
  { prefix: "/worker", role: "WORKER" },
  { prefix: "/resident", role: "RESIDENT" },
];

const AUTH_PAGES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = readSession(request.cookies.get(ACCESS_COOKIE)?.value);

  if (AUTH_PAGES.includes(pathname) && session) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
  }

  const rule = PROTECTED.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (rule) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== rule.role) {
      return NextResponse.redirect(
        new URL(ROLE_HOME[session.role], request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/manager/:path*",
    "/worker/:path*",
    "/resident/:path*",
    "/login",
    "/register",
  ],
};

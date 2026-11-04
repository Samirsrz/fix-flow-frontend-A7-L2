import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, ROLE_HOME } from "@/lib/constants/auth";
import { readSession } from "@/lib/auth/session";
import type { Role } from "@/shared/types/api";

const PROTECTED: { prefix: string; role: Role }[] = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/manager", role: "MANAGER" },
  { prefix: "/worker", role: "WORKER" },
  { prefix: "/resident", role: "RESIDENT" },
];

const AUTH_PAGES = ["/login", "/register"];

// Asks the backend for new tokens. Returns the Set-Cookie lines, or null on failure.
async function refreshTokens(refreshToken: string): Promise<string[] | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { cookie: `${REFRESH_COOKIE}=${refreshToken}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.headers.getSetCookie();
  } catch {
    return null;
  }
}

function cookieValue(setCookies: string[], name: string): string | undefined {
  const line = setCookies.find((cookie) => cookie.startsWith(`${name}=`));
  return line?.split(";")[0].slice(name.length + 1);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  let session = readSession(accessToken);
  let setCookies: string[] = [];

  // Access token missing or expired, but a refresh token exists: try to renew.
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!session && refreshToken) {
    const refreshed = await refreshTokens(refreshToken);
    if (refreshed) {
      accessToken = cookieValue(refreshed, ACCESS_COOKIE);
      session = readSession(accessToken);
      if (session) setCookies = refreshed;
    }
  }

  // Send any new cookies to the browser.
  const withCookies = (response: NextResponse) => {
    for (const cookie of setCookies) {
      response.headers.append("set-cookie", cookie);
    }
    return response;
  };

  if (AUTH_PAGES.includes(pathname) && session) {
    return withCookies(
      NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url)),
    );
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
      return withCookies(
        NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url)),
      );
    }
  }

  // Let the page being rendered see the new cookies too.
  const headers = new Headers(request.headers);
  if (setCookies.length > 0 && accessToken) {
    const jar = new Map(request.cookies.getAll().map((c) => [c.name, c.value]));
    jar.set(ACCESS_COOKIE, accessToken);
    const newRefresh = cookieValue(setCookies, REFRESH_COOKIE);
    if (newRefresh) jar.set(REFRESH_COOKIE, newRefresh);
    headers.set(
      "cookie",
      [...jar].map(([name, value]) => `${name}=${value}`).join("; "),
    );
  }

  return withCookies(NextResponse.next({ request: { headers } }));
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
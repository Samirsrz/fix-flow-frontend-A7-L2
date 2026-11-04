import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/constants/auth";

const NO_STORE = { "Cache-Control": "no-store" };

function cookieValue(setCookies: string[], name: string): string | undefined {
  const line = setCookies.find((cookie) => cookie.startsWith(`${name}=`));
  return line?.split(";")[0].slice(name.length + 1);
}

export async function GET() {
  const jar = await cookies();
  const session = readSession(jar.get(ACCESS_COOKIE)?.value);

  if (session) {
    return NextResponse.json({ user: session }, { headers: NO_STORE });
  }

  // Access token missing or expired: try the refresh token once.
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return NextResponse.json({ user: null }, { headers: NO_STORE });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { cookie: `${REFRESH_COOKIE}=${refreshToken}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ user: null }, { headers: NO_STORE });
    }

    const setCookies = res.headers.getSetCookie();
    const refreshed = readSession(cookieValue(setCookies, ACCESS_COOKIE));
    const response = NextResponse.json(
      { user: refreshed },
      { headers: NO_STORE },
    );
    for (const cookie of setCookies) {
      response.headers.append("set-cookie", cookie);
    }
    return response;
  } catch {
    return NextResponse.json({ user: null }, { headers: NO_STORE });
  }
}
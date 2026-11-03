import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { ACCESS_COOKIE } from "@/lib/constants/auth";

export async function GET() {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  return NextResponse.json(
    { user: readSession(token) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

import { ofetch } from "ofetch";
import { api } from "@/lib/api/client";
import type { SessionUser } from "@/lib/auth/session";

export async function getSession(): Promise<SessionUser | null> {
  const res = await ofetch<{ user: SessionUser | null }>("/api/session", {
    retry: 0,
  });
  return res.user;
}

export function logout() {
  return api<null>("/auth/logout", { method: "POST" });
}

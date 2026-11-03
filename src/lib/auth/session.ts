import { Role } from "@/shared/types/api";

export interface SessionUser {
  userId: string;
  name: string;
  email: string;
  role: Role;
}

export function readSession(token?: string): SessionUser | null {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

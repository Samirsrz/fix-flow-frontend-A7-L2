import { api } from "@/lib/api/client";

export interface FullUser {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  resident?: { phone?: string; unitNumber?: string };
  manager?: { phone?: string };
  worker?: { phone?: string; specialization?: string };
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  unitNumber?: string;
  specialization?: string;
}

export function getMe() {
  return api<FullUser>("/auth/me", { method: "GET" });
}

export function updateMe(payload: UpdateProfilePayload) {
  return api<FullUser>("/auth/me", { method: "PATCH", body: payload });
}
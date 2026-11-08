import { api } from "@/lib/api/client";
import type {
  AdminStats,
  AdminUser,
  Community,
  Category,
  AuditLog,
} from "./admin-types";
import type { PaginationMeta } from "@/shared/types/api";
import type { CreateUserData } from "./admin-users-view";

interface RawUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
  isDeleted: boolean;
  createdAt: string;
  imageUrl?: string;
}

interface RawCommunity {
  id: string;
  name: string;
  address: string;
  city: string;
  createdAt: string;
  manager?: { user: { name: string; email: string } };
  residents?: { id: string }[];
}

interface RawAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
  actor: { name: string; email: string; role: string };
}

export function getAdminStats() {
  return api<AdminStats>("/admin/dashboard-stats", { method: "GET" });
}

export function getAdminUsers(query: Record<string, string> = {}) {
  const params = new URLSearchParams({ limit: "100", ...query });
  return api<{ data: RawUser[]; meta: PaginationMeta }>(
    `/admin/users?${params.toString()}`,
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map((u) => ({ ...u } as AdminUser)),
    meta: res.meta,
  }));
}

export function banUser(id: string) {
  return api(`/admin/user/${id}`, {
    method: "PATCH",
    body: { status: "BANNED" },
  });
}

export function unbanUser(id: string) {
  return api(`/admin/user/${id}`, {
    method: "PATCH",
    body: { status: "ACTIVE" },
  });
}

export function deleteUser(id: string) {
  return api(`/admin/user/${id}`, { method: "DELETE" });
}

export function createUser(data: CreateUserData) {
  return api("/admin/create-role-users", { method: "POST", body: data });
}

export function getAdminCommunities() {
  return api<{ data: RawCommunity[]; meta: PaginationMeta }>(
    "/community?limit=100",
    { method: "GET" },
  ).then((res) => res.data.map((c) => ({ ...c } as Community)));
}

export function createCommunity(data: {
  name: string;
  address: string;
  city: string;
}) {
  return api("/community", { method: "POST", body: data });
}

export function getCategories() {
  return api<Category[]>("/categories", { method: "GET" });
}

export function createCategory(data: { name: string; description?: string }) {
  return api("/categories", { method: "POST", body: data });
}

export function getAuditLogs(page = 1) {
  return api<{ data: RawAuditLog[]; meta: PaginationMeta }>(
    `/admin/audit-logs?page=${page}&limit=10`,
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map((l) => ({ ...l } as AuditLog)),
    meta: res.meta,
  }));
}
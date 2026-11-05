import { api } from "@/lib/api/client";
import type { Issue, WorkerUpdate } from "./issue-types";
import type { PaginationMeta } from "@/shared/types/api";

export interface IssuesQuery {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  categoryId?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IssueListResponse {
  data: Issue[];
  meta: PaginationMeta;
}

export interface ResolveIssuePayload {
  action: "CONFIRM" | "DISPUTE";
  rating?: number;
  comment?: string;
}

export function getIssues(query: IssuesQuery = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, String(value));
  });
  return api<IssueListResponse>(`/issue?${params.toString()}`, {
    method: "GET",
  });
}

export function getIssueById(id: string) {
  return api<Issue>(`/issue/${id}`, { method: "GET" });
}

export function getIssueUpdates(id: string) {
  return api<WorkerUpdate[]>(`/issue/${id}/updates`, { method: "GET" });
}

export function createIssue(formData: FormData) {
  return api<Issue>("/issue", { method: "POST", body: formData });
}

export function resolveIssue(id: string, payload: ResolveIssuePayload) {
  return api<Issue>(`/issue/${id}/resolution`, {
    method: "POST",
    body: payload,
  });
}
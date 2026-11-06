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

// Raw shapes from backend before mapping
interface RawIssue {
  id: string;
  title: string;
  description: string;
  location?: string;
  images: string[];
  status: Issue["status"];
  priority?: Issue["priority"];
  categoryId: string;
  category?: { name: string };
  createdAt: string;
  updatedAt: string;
  assignedWorker?: {
    user?: { name?: string };
    specialization?: string;
  };
  feedback?: { rating: number; comment?: string };
}

interface RawWorkerUpdate {
  id: string;
  note?: string;
  materials?: string;
  images: string[];
  createdAt: string;
  worker?: { user?: { name?: string } };
}

function mapIssue(raw: RawIssue): Issue {
  return {
    ...raw,
    categoryName: raw.category?.name ?? "Unknown",
    assignedWorker: raw.assignedWorker
      ? {
          name: raw.assignedWorker.user?.name ?? "Unknown",
          specialization: raw.assignedWorker.specialization,
        }
      : undefined,
  };
}

function mapUpdate(raw: RawWorkerUpdate): WorkerUpdate {
  return {
    ...raw,
    workerName: raw.worker?.user?.name ?? "Worker",
  };
}

export function getIssues(query: IssuesQuery = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, String(value));
  });
  return api<{ data: RawIssue[]; meta: PaginationMeta }>(
    `/issue?${params.toString()}`,
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map(mapIssue),
    meta: res.meta,
  }));
}

export function getIssueById(id: string) {
  return api<RawIssue>(`/issue/${id}`, { method: "GET" }).then(mapIssue);
}

export function getIssueUpdates(id: string) {
  return api<RawWorkerUpdate[]>(`/issue/${id}/updates`, {
    method: "GET",
  }).then((updates) => updates.map(mapUpdate));
}

export function createIssue(formData: FormData) {
  return api<RawIssue>("/issue", { method: "POST", body: formData }).then(
    mapIssue,
  );
}

export function resolveIssue(id: string, payload: ResolveIssuePayload) {
  return api<RawIssue>(`/issue/${id}/resolution`, {
    method: "POST",
    body: payload,
  }).then(mapIssue);
}
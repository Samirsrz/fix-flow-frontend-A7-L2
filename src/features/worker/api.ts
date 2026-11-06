import { api } from "@/lib/api/client";
import type { Issue, WorkerUpdate } from "@/features/issues/issue-types";
import type { PaginationMeta } from "@/shared/types/api";

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

export function getWorkerJobs() {
  return api<{ data: RawIssue[]; meta: PaginationMeta }>(
    "/issue?limit=100",
    { method: "GET" },
  ).then((res) => res.data.map(mapIssue));
}

export function getWorkerJobById(id: string) {
  return api<RawIssue>(`/issue/${id}`, { method: "GET" }).then(mapIssue);
}

export function getWorkerJobUpdates(id: string) {
  return api<RawWorkerUpdate[]>(`/issue/${id}/worker-updates`, {
    method: "GET",
  }).then((updates) => updates.map(mapUpdate));
}

export function startJob(id: string) {
  return api(`/issue/${id}/status`, {
    method: "PATCH",
    body: { status: "IN_PROGRESS" },
  });
}

export function markJobDone(id: string) {
  return api(`/issue/${id}/status`, {
    method: "PATCH",
    body: { status: "PENDING_CONFIRMATION" },
  });
}

export function postWorkerUpdate(id: string, formData: FormData) {
  return api(`/issue/${id}/worker-updates`, {
    method: "POST",
    body: formData,
  });
}
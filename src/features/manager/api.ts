import { api } from "@/lib/api/client";
import type { ManagerStats, WorkerSummary, ResidentSummary, InvoiceSummary } from "./manager-types";
import type { ManagerIssue } from "./manager-types";
import type { Priority } from "@/features/issues/issue-types";
import type { PaginationMeta } from "@/shared/types/api";

export interface AssignWorkerPayload {
  status: "ASSIGNED";
  priority: Priority;
  assignedWorkerId: string;
}

export interface GenerateInvoicePayload {
  period: string;
  dueDate: string;
  amount: string;
  residentId?: string;
}

interface RawManagerIssue {
  id: string;
  title: string;
  description: string;
  location?: string;
  images: string[];
  status: ManagerIssue["status"];
  priority?: Priority;
  categoryId: string;
  category?: { name: string };
  createdAt: string;
  updatedAt: string;
  assignedWorker?: {
    user?: { name?: string };
    specialization?: string;
  };
  resident?: {
    user?: { name?: string };
  };
  feedback?: { rating: number; comment?: string };
}

interface RawWorker {
  id: string;
  userId: string;
  user: { name: string; email: string };
  phone?: string;
  specialization?: string;
  assignedIssues?: unknown[];
}

interface RawInvoice {
  id: string;
  period: string;
  amount: string;
  dueDate: string;
  status: "PENDING" | "PAID" | "OVERDUE";
  resident?: {
    user?: { name?: string; email?: string };
  };
}

function mapManagerIssue(raw: RawManagerIssue): ManagerIssue {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    location: raw.location,
    images: raw.images,
    status: raw.status,
    priority: raw.priority,
    categoryId: raw.categoryId,
    categoryName: raw.category?.name ?? "Unknown",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    assignedWorker: raw.assignedWorker
      ? {
          name: raw.assignedWorker.user?.name ?? "Unknown",
          specialization: raw.assignedWorker.specialization,
        }
      : undefined,
    feedback: raw.feedback,
    residentName: raw.resident?.user?.name ?? "Unknown",
  };
}

function mapWorker(raw: RawWorker): WorkerSummary {
  return {
    id: raw.id,
    userId: raw.userId,
    name: raw.user.name,
    email: raw.user.email,
    phone: raw.phone,
    specialization: raw.specialization,
    activeJobCount: raw.assignedIssues?.length ?? 0,
  };
}

function mapInvoice(raw: RawInvoice): InvoiceSummary {
  const dueDate = new Date(raw.dueDate);

  const computedStatus: InvoiceSummary["status"] =
    raw.status === "PENDING" && dueDate < new Date()
      ? "OVERDUE"
      : raw.status;

  return {
    id: raw.id,
    period: raw.period,
    amount: raw.amount,
    dueDate: raw.dueDate,
    status: computedStatus,
    residentName: raw.resident?.user?.name ?? "Unknown",
    residentEmail: raw.resident?.user?.email ?? "",
  };
}

export function getManagerStats() {
  return api<ManagerStats>("/admin/dashboard-stats", { method: "GET" });
}

export function getManagerIssues(query: Record<string, string> = {}) {
  const params = new URLSearchParams(query);
  return api<{ data: RawManagerIssue[]; meta: PaginationMeta }>(
    `/issue?${params.toString()}`,
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map(mapManagerIssue),
    meta: res.meta,
  }));
}

export function assignWorker(issueId: string, payload: AssignWorkerPayload) {
  return api(`/issue/${issueId}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function getWorkersForManager() {
  return api<RawWorker[]>("/issue/workers", { method: "GET" }).then((res) =>
    res.map(mapWorker),
  );
}
export function getManagerResidents() {
  return api<{ data: { id: string; unitNumber?: string; user: { name: string; email: string } }[] }>(
    "/community?limit=1",
    { method: "GET" },
  ).then(async (res) => {
    if (!res.data[0]) return [];
    const communityId = res.data[0].id;
    const community = await api<{
      residents: { id: string; unitNumber?: string; user: { name: string; email: string } }[];
    }>(`/community/${communityId}`, { method: "GET" });
    return community.residents.map((r) => ({
      id: r.id,
      name: r.user.name,
      email: r.user.email,
      unitNumber: r.unitNumber,
    })) as ResidentSummary[];
  });
}

export function getManagerInvoices(query: Record<string, string> = {}) {
  const params = new URLSearchParams(query);
  return api<{ data: RawInvoice[]; meta: PaginationMeta }>(
    `/invoice?${params.toString()}`,
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map(mapInvoice),
    meta: res.meta,
  }));
}

export function generateInvoice(payload: GenerateInvoicePayload) {
  return api("/invoice", {
    method: "POST",
    body: { ...payload, amount: Number(payload.amount) },
  });
}
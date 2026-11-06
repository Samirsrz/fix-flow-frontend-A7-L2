import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getManagerStats,
  getManagerIssues,
  assignWorker,
  getWorkersForManager,
  getManagerResidents,
  getManagerInvoices,
  generateInvoice,
  type AssignWorkerPayload,
  type GenerateInvoicePayload,
} from "./api";
import type { Priority } from "@/features/issues/issue-types";

export const managerKeys = {
  stats: ["manager", "stats"] as const,
  issues: (query: Record<string, string>) => ["manager", "issues", query] as const,
  workers: ["manager", "workers"] as const,
  residents: ["manager", "residents"] as const,
  invoices: (query: Record<string, string>) => ["manager", "invoices", query] as const,
};

export function useManagerStats() {
  return useQuery({
    queryKey: managerKeys.stats,
    queryFn: getManagerStats,
    staleTime: 2 * 60 * 1000,
  });
}

export function useManagerIssues(query: Record<string, string> = {}) {
  return useQuery({
    queryKey: managerKeys.issues(query),
    queryFn: () => getManagerIssues(query),
    staleTime: 1 * 60 * 1000,
  });
}

export function useAssignWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      issueId,
      workerId,
      priority,
    }: {
      issueId: string;
      workerId: string;
      priority: Priority;
    }) =>
      assignWorker(issueId, {
        status: "ASSIGNED",
        assignedWorkerId: workerId,
        priority,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager", "issues"] });
      toast.success("Worker assigned successfully");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useManagerWorkers() {
  return useQuery({
    queryKey: managerKeys.workers,
    queryFn: getWorkersForManager,
    staleTime: 5 * 60 * 1000,
  });
}

export function useManagerResidents() {
  return useQuery({
    queryKey: managerKeys.residents,
    queryFn: getManagerResidents,
    staleTime: 5 * 60 * 1000,
  });
}

export function useManagerInvoices(query: Record<string, string> = {}) {
  return useQuery({
    queryKey: managerKeys.invoices(query),
    queryFn: () => getManagerInvoices(query),
    staleTime: 1 * 60 * 1000,
  });
}

export function useGenerateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateInvoicePayload) => generateInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager", "invoices"] });
      toast.success("Invoice(s) generated successfully");
    },
    onError: (error) => toast.error(error.message),
  });
}
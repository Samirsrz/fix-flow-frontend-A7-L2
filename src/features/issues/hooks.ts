import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getIssues,
  getIssueById,
  getIssueUpdates,
  createIssue,
  resolveIssue,
  type IssuesQuery,
  type ResolveIssuePayload,
} from "./api";

export const issueKeys = {
  all: ["issues"] as const,
  list: (query: IssuesQuery) => ["issues", "list", query] as const,
  detail: (id: string) => ["issues", "detail", id] as const,
  updates: (id: string) => ["issues", "updates", id] as const,
};

export function useIssues(query: IssuesQuery = {}) {
  return useQuery({
    queryKey: issueKeys.list(query),
    queryFn: () => getIssues(query),
    staleTime: 1 * 60 * 1000,
  });
}

export function useIssue(id: string) {
  return useQuery({
    queryKey: issueKeys.detail(id),
    queryFn: () => getIssueById(id),
    enabled: Boolean(id),
    staleTime: 1 * 60 * 1000,
  });
}

export function useIssueUpdates(id: string) {
  return useQuery({
    queryKey: issueKeys.updates(id),
    queryFn: () => getIssueUpdates(id),
    enabled: Boolean(id),
    staleTime: 1 * 60 * 1000,
  });
}

export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createIssue(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueKeys.all });
      toast.success("Issue reported successfully");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useResolveIssue(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResolveIssuePayload) => resolveIssue(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: issueKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: issueKeys.all });
      toast.success(
        variables.action === "CONFIRM"
          ? "Issue confirmed and closed"
          : "Dispute submitted",
      );
    },
    onError: (error) => toast.error(error.message),
  });
}
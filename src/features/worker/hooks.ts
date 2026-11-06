import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getWorkerJobs,
  getWorkerJobById,
  getWorkerJobUpdates,
  startJob,
  markJobDone,
  postWorkerUpdate,
} from "./api";

export const workerKeys = {
  jobs: ["worker", "jobs"] as const,
  job: (id: string) => ["worker", "job", id] as const,
  updates: (id: string) => ["worker", "updates", id] as const,
};

export function useWorkerJobs() {
  return useQuery({
    queryKey: workerKeys.jobs,
    queryFn: getWorkerJobs,
    staleTime: 1 * 60 * 1000,
  });
}

export function useWorkerJob(id: string) {
  return useQuery({
    queryKey: workerKeys.job(id),
    queryFn: () => getWorkerJobById(id),
    enabled: Boolean(id),
    staleTime: 1 * 60 * 1000,
  });
}

export function useWorkerJobUpdates(id: string) {
  return useQuery({
    queryKey: workerKeys.updates(id),
    queryFn: () => getWorkerJobUpdates(id),
    enabled: Boolean(id),
    staleTime: 1 * 60 * 1000,
  });
}

export function useStartJob(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => startJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workerKeys.job(id) });
      queryClient.invalidateQueries({ queryKey: workerKeys.jobs });
      toast.success("Job started");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useMarkJobDone(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markJobDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workerKeys.job(id) });
      queryClient.invalidateQueries({ queryKey: workerKeys.jobs });
      toast.success("Marked as done — waiting for resident confirmation");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function usePostWorkerUpdate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postWorkerUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workerKeys.updates(id) });
      toast.success("Update posted");
    },
    onError: (error) => toast.error(error.message),
  });
}
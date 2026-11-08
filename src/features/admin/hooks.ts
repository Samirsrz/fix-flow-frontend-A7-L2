import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAdminStats,
  getAdminUsers,
  banUser,
  unbanUser,
  deleteUser,
  createUser,
  getAdminCommunities,
  createCommunity,
  getCategories,
  createCategory,
  getAuditLogs,
} from "./api";
import type { CreateUserData } from "./admin-users-view";

export const adminKeys = {
  stats: ["admin", "stats"] as const,
  users: ["admin", "users"] as const,
  communities: ["admin", "communities"] as const,
  categories: ["admin", "categories"] as const,
  auditLogs: (page: number) => ["admin", "audit-logs", page] as const,
};

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats,
    queryFn: getAdminStats,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users,
    queryFn: () => getAdminUsers(),
    staleTime: 1 * 60 * 1000,
  });
}

export function useBanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => banUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      toast.success("User banned");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useUnbanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unbanUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      toast.success("User unbanned");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      toast.success("User deleted");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserData) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      toast.success("User created successfully");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useAdminCommunities() {
  return useQuery({
    queryKey: adminKeys.communities,
    queryFn: getAdminCommunities,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.communities });
      toast.success("Community created");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: adminKeys.categories,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.categories });
      toast.success("Category created");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useAuditLogs(page: number) {
  return useQuery({
    queryKey: adminKeys.auditLogs(page),
    queryFn: () => getAuditLogs(page),
    staleTime: 1 * 60 * 1000,
  });
}
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSession, logout } from "./api";
import { authKeys } from "./keys";

export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
      router.refresh();
      toast.success("Logged out");
    },
    onError: (error) => toast.error(error.message),
  });
}

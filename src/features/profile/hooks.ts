import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getMe, updateMe, type UpdateProfilePayload } from "./api";

export const profileKeys = {
  me: ["profile", "me"] as const,
};

export function useMe() {
  return useQuery({
    queryKey: profileKeys.me,
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me });
      toast.success("Profile updated");
    },
    onError: (error) => toast.error(error.message),
  });
}
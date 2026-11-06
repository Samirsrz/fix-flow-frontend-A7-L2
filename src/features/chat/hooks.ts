import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getMessages, sendMessage } from "./api";

export const chatKeys = {
  messages: (issueId: string) => ["chat", "messages", issueId] as const,
};

export function useMessages(issueId: string) {
  return useQuery({
    queryKey: chatKeys.messages(issueId),
    queryFn: () => getMessages(issueId),
    enabled: Boolean(issueId),
    staleTime: 0,
    refetchInterval: 5000,
  });
}

export function useSendMessage(issueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendMessage(issueId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(issueId),
      });
    },
    onError: (error) => toast.error(error.message),
  });
}
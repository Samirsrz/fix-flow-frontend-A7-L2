import { api } from "@/lib/api/client";
import type { ChatMessage } from "./chat-box";

interface RawMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender?: {
    name?: string;
    role?: string;
  };
}

function mapMessage(raw: RawMessage): ChatMessage {
  return {
    id: raw.id,
    content: raw.content,
    senderId: raw.senderId,
    senderName: raw.sender?.name ?? "Unknown",
    senderRole: raw.sender?.role ?? "",
    createdAt: raw.createdAt,
  };
}

export function getMessages(issueId: string) {
  return api<RawMessage[]>(`/issue/messages/${issueId}/get`, {
    method: "GET",
  }).then((messages) => messages.map(mapMessage));
}

export function sendMessage(issueId: string, content: string) {
  return api<RawMessage>(`/issue/messages/${issueId}/send`, {
    method: "POST",
    body: { content },
  });
}
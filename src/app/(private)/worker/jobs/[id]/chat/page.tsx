"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ChatBox } from "@/features/chat/chat-box";
import { useMessages, useSendMessage } from "@/features/chat/hooks";
import { useSession } from "@/features/auth/hooks";
import { useWorkerJob } from "@/features/worker/hooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WorkerChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: job } = useWorkerJob(id);
  const { data: messages = [], isPending } = useMessages(id);
  const { mutateAsync: sendMessage, isPending: isSending } =
    useSendMessage(id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <Button
        variant="ghost"
        className="mb-4 -ml-2"
        onClick={() => router.push(`/worker/jobs/${id}`)}
      >
        <ArrowLeft data-icon="inline-start" />
        Back to job
      </Button>
      <ChatBox
        messages={messages}
        currentUserId={session?.userId ?? ""}
        isLoading={isPending}
        isSending={isSending}
        onSend={async (content) => { await sendMessage(content); }}
        issueTitle={job?.title ?? "Job chat"}
      />
    </div>
  );
}
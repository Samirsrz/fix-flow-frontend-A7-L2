"use client";

import { useIssues } from "@/features/issues/hooks";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ResidentChatPage() {
  const router = useRouter();
  const { data: issuesData } = useIssues();
  const activeIssues = (issuesData?.data ?? []).filter((issue) =>
    ["ASSIGNED", "IN_PROGRESS", "PENDING_CONFIRMATION"].includes(issue.status),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium text-primary">Messages</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        Chat
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Select an issue to open its chat.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {activeIssues.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <MessageCircle className="size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No active issues</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Chats appear here once a worker is assigned to your issue.
              </p>
            </CardContent>
          </Card>
        ) : (
          activeIssues.map((issue) => (
            <Card
              key={issue.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() =>
                router.push(`/resident/issues/${issue.id}/chat`)
              }
            >
              <CardContent className="flex items-center gap-3 p-4">
                <MessageCircle className="size-5 text-primary" />
                <div>
                  <p className="font-medium">{issue.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {issue.categoryName}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
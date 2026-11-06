"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailView } from "@/features/issues/issue-detail-view";
import { useIssue, useIssueUpdates } from "@/features/issues/hooks";

export default function ManagerIssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: issue, isPending } = useIssue(id);
  const { data: updates = [] } = useIssueUpdates(id);

  if (isPending || !issue) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <IssueDetailView
      issue={issue}
      updates={updates}
      isLoading={false}
      onConfirm={async () => {}}
      onDispute={async () => {}}
      onBack={() => router.push("/manager/issues")}
    />
  );
}
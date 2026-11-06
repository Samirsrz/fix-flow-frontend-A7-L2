"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailView } from "@/features/issues/issue-detail-view";
import {
  useIssue,
  useIssueUpdates,
  useResolveIssue,
} from "@/features/issues/hooks";

export default function ResidentIssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: issue, isPending: isLoadingDetail } = useIssue(id);
  const { data: updates = [] } = useIssueUpdates(id);
  const { mutateAsync: resolveIssue, isPending: isResolving } =
    useResolveIssue(id);

  const handleConfirm = async (rating: number, comment?: string) => {
    await resolveIssue({ action: "CONFIRM", rating, comment });
  };

  const handleDispute = async (comment?: string) => {
    await resolveIssue({ action: "DISPUTE", comment });
  };

  if (isLoadingDetail || !issue) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <IssueDetailView
      issue={issue}
      updates={updates}
      isLoading={isResolving}
      onConfirm={handleConfirm}
      onDispute={handleDispute}
      onBack={() => router.push("/resident/issues")}
    />
  );
}
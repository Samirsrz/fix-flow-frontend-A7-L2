"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailView } from "@/features/issues/issue-detail-view";
import { useIssue, useIssueUpdates } from "@/features/issues/hooks";
import PageLoader from "@/components/ui/page-loader";

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
     return <PageLoader message="Loading issue..." />;
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
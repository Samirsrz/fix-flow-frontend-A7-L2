"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailView } from "@/features/issues/issue-detail-view";
import {
  useIssue,
  useIssueUpdates,
  useResolveIssue,
} from "@/features/issues/hooks";
import PageLoader from "@/components/ui/page-loader";

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
     return <PageLoader message="Loading issue..." />;
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
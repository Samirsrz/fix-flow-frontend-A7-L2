"use client";

import { useRouter } from "next/navigation";
import { ManagerIssueQueue } from "@/features/manager/manager-issue-queue";
import {
  useManagerIssues,
  useManagerWorkers,
  useAssignWorker,
} from "@/features/manager/hooks";
import type { Priority } from "@/features/issues/issue-types";

export default function ManagerIssuesPage() {
  const router = useRouter();
  const { data: issuesData, isPending: isLoadingIssues } = useManagerIssues();
  const { data: workers = [] } = useManagerWorkers();
  const { mutateAsync: assignWorker, isPending: isAssigning } = useAssignWorker();

  const handleAssign = async (
    issueId: string,
    workerId: string,
    priority: Priority,
  ) => {
    await assignWorker({ issueId, workerId, priority });
  };

  return (
    <ManagerIssueQueue
      issues={issuesData?.data ?? []}
      isLoading={isLoadingIssues}
      workers={workers}
      onAssign={handleAssign}
      onViewDetail={(id) => router.push(`/manager/issues/${id}`)}
      isAssigning={isAssigning}
    />
  );
}
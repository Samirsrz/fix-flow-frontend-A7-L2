"use client";

import { useState } from "react";
import { IssueListView } from "@/features/issues/issue-list-view";
import { IssueDetailView } from "@/features/issues/issue-detail-view";
import { ReportIssueForm } from "@/features/issues/report-issue-form";
import {
  useIssues,
  useIssue,
  useIssueUpdates,
  useCreateIssue,
  useResolveIssue,
} from "@/features/issues/hooks";
import { useCategories } from "@/features/issues/categories-hooks";

type View = "list" | "detail" | "report";

export default function ResidentIssuesPage() {
  const [view, setView] = useState<View>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: issuesData, isPending: isLoadingList } = useIssues();
  const { data: issue, isPending: isLoadingDetail } = useIssue(
    selectedId ?? "",
  );
  const { data: updates = [] } = useIssueUpdates(selectedId ?? "");
  const { data: categories = [] } = useCategories();

  const { mutateAsync: createIssue, isPending: isCreating } = useCreateIssue();
  const { mutateAsync: resolveIssue, isPending: isResolving } = useResolveIssue(
    selectedId ?? "",
  );

  const handleIssueClick = (id: string) => {
    setSelectedId(id);
    setView("detail");
  };

  const handleConfirm = async (rating: number, comment?: string) => {
    await resolveIssue({ action: "CONFIRM", rating, comment });
  };

  const handleDispute = async (comment?: string) => {
    await resolveIssue({ action: "DISPUTE", comment });
  };

  const handleSubmitReport = async (formData: FormData) => {
    await createIssue(formData, {
      onSuccess: () => setView("list"),
    });
  };

  if (view === "report") {
    return (
      <ReportIssueForm
        categories={categories}
        onSubmit={handleSubmitReport}
        isLoading={isCreating}
        onCancel={() => setView("list")}
      />
    );
  }

  if (view === "detail" && selectedId) {
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
        onBack={() => setView("list")}
      />
    );
  }

  return (
    <IssueListView
      issues={issuesData?.data ?? []}
      isLoading={isLoadingList}
      onIssueClick={handleIssueClick}
      onNewIssue={() => setView("report")}
    />
  );
}
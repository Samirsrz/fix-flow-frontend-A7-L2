"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IssueListView } from "@/features/issues/issue-list-view";
import { ReportIssueForm } from "@/features/issues/report-issue-form";
import { useIssues, useCreateIssue } from "@/features/issues/hooks";
import { useCategories } from "@/features/issues/categories-hooks";

type View = "list" | "report";

export default function ResidentIssuesPage() {
  const [view, setView] = useState<View>("list");
  const router = useRouter();

  const { data: issuesData, isPending: isLoadingList } = useIssues();
  const { data: categories = [] } = useCategories();
  const { mutateAsync: createIssue, isPending: isCreating } = useCreateIssue();

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

  return (
    <IssueListView
      issues={issuesData?.data ?? []}
      isLoading={isLoadingList}
      onIssueClick={(id) => router.push(`/resident/issues/${id}`)}
      onNewIssue={() => setView("report")}
    />
  );
}
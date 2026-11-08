"use client";

import { useState } from "react";
import { AdminAuditLogsView } from "@/features/admin/admin-audit-logs-view";
import { useAuditLogs } from "@/features/admin/hooks";

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const { data, isPending } = useAuditLogs(page);

  return (
    <AdminAuditLogsView
      logs={data?.data ?? []}
      isLoading={isPending}
      total={data?.meta.total ?? 0}
      page={page}
      onPageChange={setPage}
    />
  );
}
"use client";

import { ManagerWorkersList } from "@/features/manager/manager-workers-list";
import { useManagerWorkers } from "@/features/manager/hooks";

export default function ManagerWorkersPage() {
  const { data: workers = [], isPending } = useManagerWorkers();

  return <ManagerWorkersList workers={workers} isLoading={isPending} />;
}
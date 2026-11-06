"use client";

import { useRouter } from "next/navigation";
import { WorkerJobList } from "@/features/worker/worker-job-list";
import { useWorkerJobs } from "@/features/worker/hooks";

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { data: jobs = [], isPending } = useWorkerJobs();

  return (
    <WorkerJobList
      jobs={jobs}
      isLoading={isPending}
      onJobClick={(id) => router.push(`/worker/jobs/${id}`)}
    />
  );
}
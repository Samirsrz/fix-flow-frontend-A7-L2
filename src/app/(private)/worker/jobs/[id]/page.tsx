"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { WorkerJobDetail } from "@/features/worker/worker-job-detail";
import {
  useWorkerJob,
  useWorkerJobUpdates,
  useStartJob,
  useMarkJobDone,
  usePostWorkerUpdate,
} from "@/features/worker/hooks";
import PageLoader from "@/components/ui/page-loader";

export default function WorkerJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: job, isPending } = useWorkerJob(id);
  const { data: updates = [] } = useWorkerJobUpdates(id);
  const { mutateAsync: startJob, isPending: isStarting } = useStartJob(id);
  const { mutateAsync: markDone, isPending: isMarking } = useMarkJobDone(id);
  const { mutateAsync: postUpdate, isPending: isUpdating } =
    usePostWorkerUpdate(id);

  if (isPending || !job) {
     return <PageLoader message="Loading issue..." />;
  }

  return (
    <WorkerJobDetail
      issue={job}
      updates={updates}
      isLoading={isPending}
      onStart={async () => { await startJob(); }}
      onMarkDone={async () => { await markDone(); }}
      onPostUpdate={async (formData: FormData) => { await postUpdate(formData); }}
      isUpdating={isUpdating}
      isStatusChanging={isStarting || isMarking}
      onBack={() => router.push("/worker/jobs")}
    />
  );
}
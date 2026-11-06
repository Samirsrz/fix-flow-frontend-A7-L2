"use client";

import { useWorkerJobs } from "@/features/worker/hooks";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkerChatPage() {
  const router = useRouter();
  const { data: jobs = [] } = useWorkerJobs();
  const activeJobs = jobs.filter((job) =>
    ["ASSIGNED", "IN_PROGRESS"].includes(job.status),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium text-primary">Messages</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        Chat
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a job to open its chat.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {activeJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <MessageCircle className="size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No active jobs</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Chats appear here when you have assigned jobs.
              </p>
            </CardContent>
          </Card>
        ) : (
          activeJobs.map((job) => (
            <Card
              key={job.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => router.push(`/worker/jobs/${job.id}/chat`)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <MessageCircle className="size-5 text-primary" />
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.categoryName}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
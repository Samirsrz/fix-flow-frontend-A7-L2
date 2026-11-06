"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Briefcase,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/hooks";
import { useWorkerJobs } from "@/features/worker/hooks";
import { IssueStatusBadge } from "@/features/issues/issue-status-badge";
import { IssuePriorityBadge } from "@/features/issues/issue-priority-badge";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: jobs = [], isPending } = useWorkerJobs();

  const firstName = session?.name.split(" ")[0] ?? "there";

  const assigned = jobs.filter((j) => j.status === "ASSIGNED");
  const inProgress = jobs.filter((j) => j.status === "IN_PROGRESS");
  const pending = jobs.filter((j) => j.status === "PENDING_CONFIRMATION");
  const closed = jobs.filter((j) => j.status === "CLOSED");

  const activeJobs = [...assigned, ...inProgress];
  const recentJobs = jobs.slice(0, 5);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8 px-2 py-4"
    >
      {/* Welcome */}
      <motion.div variants={item}>
        <p className="text-sm font-medium text-primary">Field workspace</p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Hey, {firstName} 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here are your jobs for today.
        </p>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          {
            label: "Assigned",
            value: assigned.length,
            icon: Briefcase,
            color: "text-violet-600 bg-violet-500/10",
          },
          {
            label: "In progress",
            value: inProgress.length,
            icon: Play,
            color: "text-orange-500 bg-orange-500/10",
          },
          {
            label: "Awaiting confirm",
            value: pending.length,
            icon: Clock,
            color: "text-cyan-600 bg-cyan-500/10",
          },
          {
            label: "Completed",
            value: closed.length,
            icon: CheckCircle2,
            color: "text-emerald-600 bg-emerald-500/10",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/70 shadow-sm">
            <CardContent className="flex flex-col gap-2 p-4">
              <div
                className={`flex size-9 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="size-4" />
              </div>
              {isPending ? (
                <Skeleton className="h-7 w-10" />
              ) : (
                <p className="text-2xl font-bold tracking-tight">{value}</p>
              )}
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Jobs needing action */}
      {!isPending && activeJobs.length > 0 && (
        <motion.div variants={item}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">
              Needs your attention
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/worker/jobs")}
            >
              View all
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {activeJobs.slice(0, 3).map((job) => (
              <Card
                key={job.id}
                className="cursor-pointer border-border/70 transition-shadow hover:shadow-md"
                onClick={() => router.push(`/worker/jobs/${job.id}`)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.categoryName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.priority && (
                      <IssuePriorityBadge priority={job.priority} size="sm" />
                    )}
                    <IssueStatusBadge status={job.status} size="sm" />
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <motion.div variants={item}>
        <h2 className="mb-3 font-heading text-lg font-semibold">
          Quick actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "All my jobs",
              description: "See your full job list",
              icon: Briefcase,
              href: "/worker/jobs",
            },
            {
              label: "Messages",
              description: "Chat with residents",
              icon: MessageCircle,
              href: "/worker/chat",
            },
          ].map(({ label, description, icon: Icon, href }) => (
            <Card
              key={label}
              className="cursor-pointer border-border/70 transition-shadow hover:shadow-md"
              onClick={() => router.push(href)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent jobs */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Recent jobs</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/worker/jobs")}
          >
            View all
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <Card className="border-border/70">
          <CardContent className="p-0">
            {isPending ? (
              <div className="flex flex-col divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="ml-auto h-5 w-20" />
                  </div>
                ))}
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <Briefcase className="size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No jobs yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jobs assigned to you will appear here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border/60">
                {recentJobs.map((job) => (
                  // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
                    key={job.id}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
                    onClick={() => router.push(`/worker/jobs/${job.id}`)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {job.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.categoryName}
                      </p>
                    </div>
                    <IssueStatusBadge status={job.status} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
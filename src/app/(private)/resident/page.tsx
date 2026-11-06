"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ClipboardList,
  CreditCard,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/hooks";
import { useIssues } from "@/features/issues/hooks";
import { IssueStatusBadge } from "@/features/issues/issue-status-badge";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ResidentHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: issuesData, isPending } = useIssues({ limit: 5, sortBy: "createdAt", sortOrder: "desc" });

  const issues = issuesData?.data ?? [];
  const total = issuesData?.meta.total ?? 0;

  const openCount = issues.filter((i) =>
    ["REPORTED", "ASSIGNED", "IN_PROGRESS", "UNDER_REVIEW"].includes(i.status),
  ).length;

  const pendingCount = issues.filter(
    (i) => i.status === "PENDING_CONFIRMATION",
  ).length;

  const closedCount = issues.filter((i) => i.status === "CLOSED").length;

  const firstName = session?.name.split(" ")[0] ?? "there";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8 px-2 py-4"
    >
      {/* Welcome */}
      <motion.div variants={item}>
        <p className="text-sm font-medium text-primary">Welcome back</p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Hey, {firstName} 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here is what is happening in your community today.
        </p>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        variants={item}
        className="grid grid-cols-3 gap-3 sm:gap-4"
      >
        {[
          {
            label: "Open",
            value: openCount,
            icon: AlertCircle,
            color: "text-primary bg-primary/10",
          },
          {
            label: "Awaiting you",
            value: pendingCount,
            icon: Clock,
            color: "text-orange-500 bg-orange-500/10",
          },
          {
            label: "Resolved",
            value: closedCount,
            icon: CheckCircle2,
            color: "text-emerald-600 bg-emerald-500/10",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card
            key={label}
            className="border-border/70 shadow-sm"
          >
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

      {/* Quick actions */}
      <motion.div variants={item}>
        <h2 className="mb-3 font-heading text-lg font-semibold">
          Quick actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Report an issue",
              description: "Submit a new maintenance request",
              icon: Plus,
              href: "/resident/issues",
              variant: "default" as const,
            },
            {
              label: "My payments",
              description: "View and pay maintenance invoices",
              icon: CreditCard,
              href: "/resident/payments",
              variant: "outline" as const,
            },
            {
              label: "Messages",
              description: "Chat with assigned workers",
              icon: MessageCircle,
              href: "/resident/chat",
              variant: "outline" as const,
            },
          ].map(({ label, description, icon: Icon, href, variant }) => (
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

      {/* Recent issues */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Recent issues</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/resident/issues")}
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
            ) : issues.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <ClipboardList className="size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No issues yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Report your first community issue.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => router.push("/resident/issues")}
                >
                  <Plus data-icon="inline-start" />
                  Report issue
                </Button>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border/60">
                {issues.map((issue) => (
                  // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
                    key={issue.id}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
                    onClick={() =>
                      router.push(`/resident/issues/${issue.id}`)
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {issue.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {issue.categoryName}
                      </p>
                    </div>
                    <IssueStatusBadge status={issue.status} size="sm" />
                  </div>
                ))}
                {total > 5 && (
                  <div className="px-4 py-3 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/resident/issues")}
                    >
                      +{total - 5} more issues
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
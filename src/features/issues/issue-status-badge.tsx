"use client"

import { AlertTriangle, CheckCircle2, Circle, Clock, Search, UserCheck, Wrench, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { IssueStatus } from "./issue-types"

const config: Record<IssueStatus, { label: string; icon: typeof Circle; className: string }> = {
  REPORTED: { label: "Reported", icon: Circle, className: "border-primary/20 bg-primary/10 text-primary" },
  UNDER_REVIEW: { label: "Under review", icon: Search, className: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  ASSIGNED: { label: "Assigned", icon: UserCheck, className: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300" },
  IN_PROGRESS: { label: "In progress", icon: Wrench, className: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300" },
  PENDING_CONFIRMATION: { label: "Needs confirmation", icon: Clock, className: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300" },
  CLOSED: { label: "Closed", icon: CheckCircle2, className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  REJECTED: { label: "Rejected", icon: XCircle, className: "border-destructive/20 bg-destructive/10 text-destructive" },
  DISPUTED: { label: "Disputed", icon: AlertTriangle, className: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300" },
}

export function IssueStatusBadge({ status, size = "default" }: { status: IssueStatus; size?: "sm" | "default" }) {
  const item = config[status]
  const Icon = item.icon
  return <Badge variant="outline" className={`${item.className} gap-1.5 ${size === "sm" ? "px-2 py-0 text-[11px]" : ""}`}><Icon className="size-3.5" />{item.label}</Badge>
}

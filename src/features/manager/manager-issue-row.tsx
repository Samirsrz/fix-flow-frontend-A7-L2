"use client"

import { motion } from "motion/react"
import { ArrowUpRight, CalendarDays, MapPin, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IssuePriorityBadge } from "../issues/issue-priority-badge"
import { IssueStatusBadge } from "../issues/issue-status-badge"
import type { ManagerIssue } from "./manager-types"

export function ManagerIssueRow({ issue, onAssign, onViewDetail }: { issue: ManagerIssue; onAssign: (issue: ManagerIssue) => void; onViewDetail: (id: string) => void }) {
  const canAssign = issue.status === "REPORTED" || issue.status === "DISPUTED"
  return <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className="group rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><button type="button" onClick={() => onViewDetail(issue.id)} className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{issue.categoryName}</span>{issue.priority && <IssuePriorityBadge priority={issue.priority} size="sm" />}</div><h3 className="mt-2 truncate text-base font-semibold transition-colors group-hover:text-primary">{issue.title}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><UserRound className="size-3.5" />{issue.residentName}</span><span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" />{new Date(issue.createdAt).toLocaleDateString()}</span>{issue.location && <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{issue.location}</span>}</div></button><div className="flex items-center justify-between gap-3 lg:justify-end"><IssueStatusBadge status={issue.status} size="sm" />{canAssign ? <Button size="sm" onClick={() => onAssign(issue)} className="group/btn">Assign <ArrowUpRight className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" data-icon="inline-end" /></Button> : <span className="text-xs font-medium text-muted-foreground">{issue.assignedWorker ? `Assigned to ${issue.assignedWorker.name}` : "No action needed"}</span>}</div></div>
  </motion.div>
}

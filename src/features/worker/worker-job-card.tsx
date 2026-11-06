"use client"

import { ArrowRight, MapPin, Users } from "lucide-react"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { IssuePriorityBadge } from "../issues/issue-priority-badge"
import { IssueStatusBadge } from "../issues/issue-status-badge"
import type { Issue } from "../issues/issue-types"

const statusBorder: Record<Issue["status"], string> = { REPORTED: "border-l-primary", UNDER_REVIEW: "border-l-primary", ASSIGNED: "border-l-violet-500", IN_PROGRESS: "border-l-orange-500", PENDING_CONFIRMATION: "border-l-cyan-500", CLOSED: "border-l-emerald-500", REJECTED: "border-l-destructive", DISPUTED: "border-l-rose-500" }
const relativeTime = (value: string) => { const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86400000)); return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago` }

export function WorkerJobCard({ issue, onClick, index = 0 }: { issue: Issue; onClick: () => void; index?: number }) {
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.35 }} whileHover={{ y: -4 }}><Card className={`cursor-pointer overflow-hidden border-l-4 transition-shadow hover:shadow-lg ${statusBorder[issue.status]}`} onClick={onClick}><CardContent className="flex min-h-44 flex-col gap-4 p-5"><div className="flex items-start justify-between gap-3"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{issue.categoryName}</span><IssueStatusBadge status={issue.status} size="sm" />{issue.priority && <IssuePriorityBadge priority={issue.priority} size="sm" />}</div><ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" /></div><div><h3 className="font-heading line-clamp-2 text-lg font-semibold tracking-tight">{issue.title}</h3><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{issue.description}</p></div><div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">{issue.location && <span className="flex items-center gap-1"><MapPin className="size-3.5" />{issue.location}</span>}{issue.assignedWorker && <span className="flex items-center gap-1"><Users className="size-3.5" />{issue.assignedWorker.name}</span>}<span className="ml-auto">{relativeTime(issue.createdAt)}</span></div></CardContent></Card></motion.div>
}

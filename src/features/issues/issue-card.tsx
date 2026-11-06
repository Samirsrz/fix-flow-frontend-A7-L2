"use client"

import { motion } from "motion/react"
import { ArrowUpRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { IssueStatusBadge } from "./issue-status-badge"
import { IssuePriorityBadge } from "./issue-priority-badge"
import type { Issue } from "./issue-types"

function relativeDate(value: string) { const diff = Date.now() - new Date(value).getTime(); const days = Math.floor(diff / 86400000); if (days <= 0) return "Today"; if (days === 1) return "Yesterday"; return `${days} days ago` }

export function IssueCard({ issue, onClick, index = 0 }: { issue: Issue; onClick: () => void; index?: number }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }}>
    <Card onClick={onClick} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onClick() }} role="button" tabIndex={0} className="group cursor-pointer overflow-hidden border-border/70 transition-colors hover:border-primary/40 hover:bg-accent/35">
      <CardContent className="flex items-start gap-4 p-5"><div className="min-w-0 flex-1"><div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{issue.categoryName}</span><IssueStatusBadge status={issue.status} size="sm" />{issue.priority && <IssuePriorityBadge priority={issue.priority} size="sm" />}</div><h3 className="font-heading line-clamp-2 text-lg font-semibold tracking-tight group-hover:text-primary">{issue.title}</h3><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">{issue.location && <span className="flex items-center gap-1"><MapPin className="size-3.5" />{issue.location}</span>}<span>{relativeDate(issue.createdAt)}</span></div></div><ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></CardContent>
    </Card>
  </motion.div>
}

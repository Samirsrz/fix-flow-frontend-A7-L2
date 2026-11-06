"use client"

import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2, Clock3, Play, ShieldCheck, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IssueStatusBadge } from "../issues/issue-status-badge"
import type { Issue } from "../issues/issue-types"

export function WorkerStatusActions({ issue, onStart, onMarkDone, isLoading }: { issue: Issue; onStart: () => Promise<void>; onMarkDone: () => Promise<void>; isLoading: boolean }) {
  return <AnimatePresence mode="wait"><motion.div key={issue.status} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="overflow-hidden"><CardContent className="flex flex-col gap-4 p-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">{issue.status === "ASSIGNED" ? <Play className="size-5" /> : issue.status === "IN_PROGRESS" ? <Wrench className="size-5" /> : issue.status === "PENDING_CONFIRMATION" ? <Clock3 className="size-5" /> : <CheckCircle2 className="size-5" />}</div><div><p className="font-heading font-semibold">{issue.status === "ASSIGNED" ? "Ready to get started?" : issue.status === "IN_PROGRESS" ? "Work in progress" : issue.status === "PENDING_CONFIRMATION" ? "Waiting for resident confirmation" : "This job is closed"}</p><p className="text-sm text-muted-foreground">{issue.status === "ASSIGNED" ? "Starting lets the resident know you are on it." : issue.status === "IN_PROGRESS" ? "Share updates as you make progress in the field." : issue.status === "PENDING_CONFIRMATION" ? "The resident will review your completed work." : "No further action is needed on this assignment."}</p></div></div>{issue.status === "ASSIGNED" ? <Button className="w-full" onClick={onStart} disabled={isLoading}><Play data-icon="inline-start" />Start job</Button> : issue.status === "IN_PROGRESS" ? <Button className="w-full" onClick={onMarkDone} disabled={isLoading}><ShieldCheck data-icon="inline-start" />Mark as done</Button> : <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3"><span className="text-sm text-muted-foreground">Current status</span><IssueStatusBadge status={issue.status} /></div>}</CardContent></Card></motion.div></AnimatePresence>
}

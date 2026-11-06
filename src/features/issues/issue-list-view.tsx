"use client"

import { useMemo, useState } from "react"
import { ClipboardList, Plus } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { IssueCard } from "./issue-card"
import type { Issue } from "./issue-types"

export function IssueListView({ issues, isLoading, onIssueClick, onNewIssue }: { issues: Issue[]; isLoading: boolean; onIssueClick: (id: string) => void; onNewIssue: () => void }) {
  const [filter, setFilter] = useState<"All" | "Open" | "Closed">("All")
  const visible = useMemo(() => issues.filter((issue) => filter === "All" || (filter === "Closed" ? issue.status === "CLOSED" : issue.status !== "CLOSED")), [issues, filter])
  return <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-sm font-medium text-primary">Community care</p><h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">My Issues</h1><p className="mt-2 text-muted-foreground">Track the problems you&apos;ve helped bring to light.</p></div><Button onClick={onNewIssue} className="w-full sm:w-auto"><Plus data-icon="inline-start" />Report issue</Button></div><div className="mb-6 flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1"><span className="mr-2 hidden px-2 text-xs font-medium text-muted-foreground sm:inline">Show</span>{(["All", "Open", "Closed"] as const).map((item) => <Button key={item} variant={filter === item ? "secondary" : "ghost"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div>{isLoading ? <div className="grid gap-4 lg:grid-cols-2">{[1,2,3].map((item) => <Skeleton key={item} className="h-40 rounded-xl" />)}</div> : visible.length ? <div className="grid gap-4 lg:grid-cols-2">{visible.map((issue, index) => <IssueCard key={issue.id} issue={issue} onClick={() => onIssueClick(issue.id)} index={index} />)}</div> : <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 text-center"><div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ClipboardList className="size-8" /></div><h2 className="font-heading text-xl font-semibold">No issues yet</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">Report your first community issue and help make your neighborhood better.</p></motion.div>}</section>
}

"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ClipboardList, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { AssignWorkerDialog } from "./assign-worker-dialog"
import { ManagerIssueRow } from "./manager-issue-row"
import type { Priority } from "../issues/issue-types"
import type { ManagerIssue, WorkerSummary } from "./manager-types"

export function ManagerIssueQueue({ issues, isLoading, workers, onAssign, onViewDetail, isAssigning }: { issues: ManagerIssue[]; isLoading: boolean; workers: WorkerSummary[]; onAssign: (issueId: string, workerId: string, priority: Priority) => Promise<void>; onViewDetail: (id: string) => void; isAssigning: boolean }) {
  const [filter, setFilter] = useState("all"); const [search, setSearch] = useState(""); const [selected, setSelected] = useState<ManagerIssue | null>(null)
  const filtered = useMemo(() => issues.filter((issue) => { const matchesSearch = `${issue.title} ${issue.residentName} ${issue.categoryName}`.toLowerCase().includes(search.toLowerCase()); const matchesFilter = filter === "all" || filter === "action" && ["REPORTED", "DISPUTED"].includes(issue.status) || filter === "progress" && ["ASSIGNED", "IN_PROGRESS", "UNDER_REVIEW"].includes(issue.status) || filter === "closed" && ["CLOSED", "REJECTED"].includes(issue.status); return matchesSearch && matchesFilter }), [issues, search, filter])
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  return <section className="flex flex-col gap-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Operations</p><h1 className="font-heading text-3xl font-semibold tracking-tight">Issue Queue</h1><p className="mt-1 text-sm text-muted-foreground">Review, route, and keep your community moving.</p></div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search issues" className="pl-9" /></div></div><Tabs value={filter} onValueChange={setFilter}><TabsList className="w-full justify-start overflow-x-auto"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="action">Needs action</TabsTrigger><TabsTrigger value="progress">In progress</TabsTrigger><TabsTrigger value="closed">Closed</TabsTrigger></TabsList></Tabs><div className="flex flex-col gap-3">{isLoading ? Array.from({ length: 4 }).map((_, index) => <Skeleton className="h-32 rounded-2xl" key={index} />) : filtered.length > 0 ? filtered.map((issue) => <ManagerIssueRow key={issue.id} issue={issue} onAssign={setSelected} onViewDetail={onViewDetail} />) : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center"><div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted"><ClipboardList className="size-6 text-muted-foreground" /></div><h2 className="font-heading text-lg font-semibold">Nothing here yet</h2><p className="mt-1 max-w-sm text-sm text-muted-foreground">Try another filter or search term.</p><Button variant="ghost" className="mt-3" onClick={() => { setFilter("all"); setSearch("") }}>Clear filters</Button></motion.div>}</div><AssignWorkerDialog open={Boolean(selected)} onClose={() => setSelected(null)} issue={selected} workers={workers} onAssign={onAssign} isLoading={isAssigning} /></section>
}

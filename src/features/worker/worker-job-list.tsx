"use client"

import { useState } from "react"
import { BriefcaseBusiness } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Issue } from "../issues/issue-types"
import { WorkerJobCard } from "./worker-job-card"

const tabs = [{ label: "All", key: "all" }, { label: "Active", key: "active" }, { label: "Pending confirmation", key: "pending" }, { label: "Closed", key: "closed" }] as const
const filter = (jobs: Issue[], key: string) => key === "active" ? jobs.filter((job) => ["ASSIGNED", "IN_PROGRESS"].includes(job.status)) : key === "pending" ? jobs.filter((job) => job.status === "PENDING_CONFIRMATION") : key === "closed" ? jobs.filter((job) => job.status === "CLOSED") : jobs

export function WorkerJobList({ jobs, isLoading, onJobClick }: { jobs: Issue[]; isLoading: boolean; onJobClick: (id: string) => void }) {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("all")
  const visible = filter(jobs, active)
  return <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><p className="text-sm font-medium text-primary">Field workspace</p><h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">My Jobs</h1><p className="mt-2 text-muted-foreground">Keep your assigned community work moving forward.</p></motion.div><div className="mt-8 flex gap-2 overflow-x-auto border-b border-border pb-px">{tabs.map((tab) => <button type="button" key={tab.key} onClick={() => setActive(tab.key)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${active === tab.key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}><span>{tab.label}</span><Badge variant={active === tab.key ? "default" : "secondary"}>{filter(jobs, tab.key).length}</Badge></button>)}</div>{isLoading ? <div className="mt-6 grid gap-4 lg:grid-cols-2">{[1, 2, 3].map((item) => <Card key={item}><CardContent className="flex flex-col gap-4 p-5"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /><Skeleton className="h-4 w-1/3" /></CardContent></Card>)}</div> : visible.length === 0 ? <Card className="mt-6"><CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center"><BriefcaseBusiness className="size-10 text-muted-foreground" /><h2 className="font-heading text-xl font-semibold">No jobs here yet</h2><p className="max-w-sm text-sm text-muted-foreground">New assignments will appear in this workspace when they are ready for you.</p></CardContent></Card> : <motion.div layout className="mt-6 grid gap-4 lg:grid-cols-2">{visible.map((job, index) => <WorkerJobCard key={job.id} issue={job} index={index} onClick={() => onJobClick(job.id)} />)}</motion.div>}</main>
}

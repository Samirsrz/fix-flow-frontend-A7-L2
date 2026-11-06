"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Search, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Priority } from "../issues/issue-types"
import type { ManagerIssue, WorkerSummary } from "./manager-types"

const schema = z.object({ priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]), workerId: z.string().min(1, "Choose a worker") })
type Values = z.infer<typeof schema>

export function AssignWorkerDialog({ open, onClose, issue, workers, onAssign, isLoading }: { open: boolean; onClose: () => void; issue: ManagerIssue | null; workers: WorkerSummary[]; onAssign: (issueId: string, workerId: string, priority: Priority) => Promise<void>; isLoading: boolean }) {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { priority: "MEDIUM", workerId: "" } })
  const search = form.watch("workerId")
  const filteredWorkers = useMemo(() => workers.filter((worker) => worker.name.toLowerCase().includes(search.toLowerCase()) || worker.specialization?.toLowerCase().includes(search.toLowerCase())), [workers, search])
  async function submit(values: Values) { if (!issue) return; await onAssign(issue.id, values.workerId, values.priority); form.reset(); onClose() }
  return <Dialog open={open} onOpenChange={(value) => !value && onClose()}><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Assign worker</DialogTitle><DialogDescription>Route this issue to the right member of your maintenance team.</DialogDescription></DialogHeader>{issue && <div className="rounded-xl bg-muted/60 p-3"><p className="text-xs font-medium text-muted-foreground">Issue</p><p className="mt-1 font-semibold">{issue.title}</p></div>}<Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-5"><FormField control={form.control} name="priority" render={({ field }) => <FormItem><FormLabel>Priority</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger></FormControl><SelectContent>{["LOW", "MEDIUM", "HIGH", "URGENT"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} /><FormField control={form.control} name="workerId" render={({ field }) => <FormItem><FormLabel>Worker</FormLabel><div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input value={field.value} onChange={field.onChange} placeholder="Search workers by name or specialty" className="pl-9" /></div><div className="max-h-52 overflow-y-auto rounded-xl border border-border/70 p-1">{filteredWorkers.map((worker) => <button type="button" key={worker.id} onClick={() => field.onChange(worker.id)} className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-muted ${field.value === worker.id ? "bg-primary/10" : ""}`}><Avatar className="size-9"><AvatarFallback className="bg-primary/10 text-xs text-primary">{worker.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</AvatarFallback></Avatar><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{worker.name}</span><span className="block truncate text-xs text-muted-foreground">{worker.specialization || "General maintenance"}</span></span><span className="rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">{worker.activeJobCount} active</span>{field.value === worker.id && <Check className="size-4 text-primary" />}</button>)}{filteredWorkers.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">No workers found.</p>}</div><FormMessage /></FormItem>} /><DialogFooter><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" disabled={isLoading || !issue}>{isLoading ? "Assigning..." : "Assign worker"}</Button></DialogFooter></form></Form></DialogContent></Dialog>
}

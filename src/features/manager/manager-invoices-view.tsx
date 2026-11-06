"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ManagerInvoiceRow } from "./manager-invoice-row"
import type { InvoiceSummary, ResidentSummary } from "./manager-types"

export type GenerateInvoiceData = { period: string; dueDate: string; amount: string; residentId?: string }
const schema = z.object({ period: z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM"), dueDate: z.string().min(1, "Choose a due date"), amount: z.string().min(1, "Enter an amount"), residentId: z.string().optional() })










export function ManagerInvoicesView({ invoices, residents, isLoading, onGenerate, isGenerating }: { invoices: InvoiceSummary[]; residents: ResidentSummary[]; isLoading: boolean; onGenerate: (data: GenerateInvoiceData) => Promise<void>; isGenerating: boolean }) {
  const [open, setOpen] = useState(false); const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState(""); const form = useForm<GenerateInvoiceData>({ resolver: zodResolver(schema), defaultValues: { period: "", dueDate: "", amount: "", residentId: "all" } })






  const filtered = useMemo(() => invoices.filter((invoice) => (filter === "ALL" || invoice.status === filter) && `${invoice.residentName} ${invoice.period}`.toLowerCase().includes(search.toLowerCase())), [invoices, filter, search])
  async function submit(data: GenerateInvoiceData) { await onGenerate({ ...data, residentId: data.residentId === "all" ? undefined : data.residentId }); form.reset(); setOpen(false) }





  return <section className="flex flex-col gap-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Finance</p><h1 className="font-heading text-3xl font-semibold tracking-tight">Invoices</h1><p className="mt-1 text-sm text-muted-foreground">Keep resident billing clear and on schedule.</p></div><div className="flex flex-col gap-2 sm:flex-row">
    
    <div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search invoices" className="pl-9" /></div>
    
    
    <Button onClick={() => setOpen(true)}><Plus data-icon="inline-start" />Generate invoices</Button>
    
    </div></div>
    
    
    {/** biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
<Tabs value={filter} onValueChange={setFilter}><TabsList><TabsTrigger value="ALL">All</TabsTrigger><TabsTrigger value="PENDING">Pending</TabsTrigger><TabsTrigger value="PAID">Paid</TabsTrigger><TabsTrigger value="OVERDUE">Overdue</TabsTrigger></TabsList></Tabs><div className="flex flex-col gap-3">{isLoading ? Array.from({ length: 4 }).map((_, i) => <Skeleton className="h-24 rounded-2xl" key={i} />) : filtered.length ? filtered.map((invoice) => <ManagerInvoiceRow key={invoice.id} invoice={invoice} onClick={() => undefined} />) : <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center"><FileText className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 font-medium">No invoices found</p><p className="mt-1 text-sm text-muted-foreground">Generate an invoice to get started.</p></div>}</div><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Generate invoices</DialogTitle><DialogDescription>Create billing for one resident or your entire community.</DialogDescription></DialogHeader><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4"><div className="grid gap-4 sm:grid-cols-2"><FormField control={form.control} name="period" render={({ field }) => <FormItem><FormLabel>Period</FormLabel><FormControl><Input placeholder="2026-09" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="dueDate" render={({ field }) => <FormItem><FormLabel>Due date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>} /></div><FormField control={form.control} name="amount" render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" min="0" step="0.01" placeholder="125.00" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="residentId" render={({ field }) => <FormItem><FormLabel>Resident</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="All residents" /></SelectTrigger></FormControl><SelectContent><SelectItem value="all">All residents</SelectItem>{residents.map((resident) => <SelectItem key={resident.id} value={resident.id}>{resident.name}{resident.unitNumber ? ` · Unit ${resident.unitNumber}` : ""}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} /><DialogFooter><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate invoices"}</Button></DialogFooter></form></Form></DialogContent></Dialog></section>
}

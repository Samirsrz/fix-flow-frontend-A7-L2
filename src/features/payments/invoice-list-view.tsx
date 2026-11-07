"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoiceCard } from "./invoice-card"
import type { Invoice, InvoiceStatus } from "./invoice-types"

const filters = ["ALL", "PENDING", "PAID", "OVERDUE"] as const
type Filter = typeof filters[number]
function numeric(value: string) { const parsed = Number(value.replace(/[^\d.-]/g, "")); return Number.isFinite(parsed) ? parsed : 0 }
function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value) }

export function InvoiceListView({ invoices, isLoading, onPay, isPaying }: { invoices: Invoice[]; isLoading: boolean; onPay: (id: string) => void; isPaying: string | null }) {
  const [filter, setFilter] = useState<Filter>("ALL")
  const filtered = useMemo(() => filter === "ALL" ? invoices : invoices.filter((invoice) => invoice.status === filter), [filter, invoices])
  const stats = useMemo(() => ({ total: invoices.length, paid: invoices.filter((invoice) => invoice.status === "PAID").reduce((sum, invoice) => sum + numeric(invoice.amount), 0), pending: invoices.filter((invoice) => invoice.status !== "PAID").reduce((sum, invoice) => sum + numeric(invoice.amount), 0) }), [invoices])

  return <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"><motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Billing</p><h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">My Payments</h1><p className="mt-2 max-w-xl text-muted-foreground">View your community maintenance fees, payment history, and upcoming due dates.</p></motion.header>
    <div className="mb-8 grid gap-3 sm:grid-cols-3"><Stat label="Total invoices" value={String(stats.total)} /><Stat label="Total paid" value={money(stats.paid)} /><Stat label="Pending amount" value={money(stats.pending)} /></div>
    <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="mb-6"><TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl bg-muted/60 p-1 sm:w-fit"><TabsTrigger value="ALL">All</TabsTrigger><TabsTrigger value="PENDING">Pending</TabsTrigger><TabsTrigger value="PAID">Paid</TabsTrigger><TabsTrigger value="OVERDUE">Overdue</TabsTrigger></TabsList></Tabs>
    {isLoading ? <div className="grid gap-5 lg:grid-cols-2">{[0, 1, 2, 3].map((item) => <Card key={item} className="rounded-2xl p-6"><Skeleton className="h-5 w-2/5" /><Skeleton className="mt-4 h-10 w-1/3" /><Skeleton className="mt-6 h-4 w-full" /><Skeleton className="mt-6 h-10 w-full" /></Card>)}</div> : filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} onPay={onPay} isPaying={isPaying === invoice.id} />)}</div> : <Card className="rounded-2xl border-dashed"><CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center"><Receipt className="size-10 text-muted-foreground" /><h2 className="font-heading text-xl font-semibold">No invoices found</h2><p className="text-sm text-muted-foreground">There are no invoices in this category yet.</p></CardContent></Card>}
  </main>
}
function Stat({ label, value }: { label: string; value: string }) { return <Card className="rounded-2xl border-border/70"><CardContent className="p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-heading text-xl font-semibold tracking-tight">{value}</p></CardContent></Card> }

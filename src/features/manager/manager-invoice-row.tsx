"use client"

import { motion } from "motion/react"
import { CalendarDays, ChevronRight, CircleDollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { InvoiceSummary } from "./manager-types"

const statusConfig = { PENDING: { label: "Pending", className: "border-primary/20 bg-primary/10 text-primary" }, PAID: { label: "Paid", className: "border-accent/40 bg-accent text-accent-foreground" }, OVERDUE: { label: "Overdue", className: "border-destructive/20 bg-destructive/10 text-destructive" } } as const


export function ManagerInvoiceRow({ invoice, onClick }: { invoice: InvoiceSummary; onClick: () => void }) { const status = statusConfig[invoice.status]; return <motion.button type="button" onClick={onClick} whileHover={{ y: -2 }} className="group grid w-full gap-3 rounded-2xl border border-border/70 bg-card p-4 text-left shadow-sm transition-shadow hover:shadow-md sm:grid-cols-[1.4fr_1fr_.7fr_1fr_auto] sm:items-center"><div><p className="font-semibold">{invoice.residentName}</p><p className="mt-0.5 text-xs text-muted-foreground">{invoice.residentEmail}</p></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" />{new Date(`${invoice.period}-01`).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span><span className="flex items-center gap-2 font-semibold"><CircleDollarSign className="size-4 text-primary" />${Number(invoice.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span><span className="text-sm text-muted-foreground">Due {new Date(invoice.dueDate).toLocaleDateString()}</span><span className="flex items-center justify-between sm:justify-end"><Badge variant="outline" className={status.className}>{status.label}</Badge><ChevronRight className="ml-3 size-4 text-muted-foreground transition-transform group-hover:translate-x-1" /></span></motion.button> }

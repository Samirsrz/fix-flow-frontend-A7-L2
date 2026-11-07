"use client"

import { motion } from "motion/react"
import { CalendarDays, CheckCircle2, CreditCard, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InvoiceStatusBadge } from "./invoice-status-badge"
import type { Invoice } from "./invoice-types"

function displayAmount(amount: string) {
  const numeric = Number(amount.replace(/[^\d.-]/g, ""))
  return Number.isFinite(numeric) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(numeric) : amount
}

export function InvoiceCard({ invoice, onPay, isPaying }: { invoice: Invoice; onPay: (id: string) => void; isPaying: boolean }) {
  const paidAt = invoice.payments.find((payment) => payment.status.toUpperCase() === "PAID")?.paidAt
  const needsPayment = invoice.status === "PENDING" || invoice.status === "OVERDUE"

  return <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
    <Card className={`overflow-hidden rounded-2xl border-border/70 transition-colors hover:border-primary/35 ${invoice.status === "OVERDUE" ? "border-destructive/35 bg-destructive/[0.025]" : ""}`}>
      <CardContent className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{invoice.communityName}</p><h2 className="mt-2 font-heading text-xl font-semibold tracking-tight">{invoice.period}</h2></div><InvoiceStatusBadge status={invoice.status} /></div>
        <div className="rounded-xl bg-muted/45 px-4 py-4"><p className="text-xs text-muted-foreground">Amount due</p><p className="mt-1 font-heading text-3xl font-semibold tracking-tight">{displayAmount(invoice.amount)}</p></div>
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" />Due {invoice.dueDate}</span>{invoice.status === "PAID" && paidAt && <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="size-4" />Paid {paidAt}</span>}</div>
        {invoice.status === "OVERDUE" && <p className="flex items-center gap-2 text-sm font-medium text-destructive"><TriangleAlert className="size-4" />This invoice is overdue</p>}
        {needsPayment && <Button className="w-full rounded-xl" onClick={() => onPay(invoice.id)} disabled={isPaying}><CreditCard data-icon="inline-start" />{isPaying ? "Preparing checkout..." : "Pay now"}</Button>}
      </CardContent>
    </Card>
  </motion.div>
}

import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { InvoiceStatus } from "./invoice-types"

const config: Record<InvoiceStatus, { label: string; icon: typeof Clock; className: string }> = {
  PENDING: { label: "Pending", icon: Clock, className: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  PAID: { label: "Paid", icon: CheckCircle2, className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  OVERDUE: { label: "Overdue", icon: AlertCircle, className: "border-destructive/25 bg-destructive/10 text-destructive" },
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const item = config[status]
  const Icon = item.icon
  return <Badge variant="outline" className={`gap-1.5 ${item.className}`}><Icon className="size-3.5" />{item.label}</Badge>
}

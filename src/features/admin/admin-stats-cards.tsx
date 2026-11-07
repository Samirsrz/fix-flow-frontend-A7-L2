"use client"

import { motion } from "motion/react"
import { AlertCircle, ClipboardList, Clock, DollarSign, HardHat, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { AdminStats } from "./admin-types"

const cards = [
  ["Total Issues", "issues", ClipboardList], ["Open Issues", "open", AlertCircle], ["Residents", "residents", Users],
  ["Workers", "workers", HardHat], ["Total Revenue", "revenue", DollarSign], ["Avg Resolution", "resolution", Clock],
] as const

export function AdminStatsCards({ stats, isLoading }: { stats: AdminStats; isLoading: boolean }) {
  const total = Object.values(stats.issuesByStatus).reduce((sum, value) => sum + value, 0)
  const open = Object.entries(stats.issuesByStatus).filter(([key]) => !["CLOSED", "REJECTED"].includes(key)).reduce((sum, [, value]) => sum + value, 0)
  const values: Record<string, string> = {
    issues: total.toLocaleString(), open: open.toLocaleString(), residents: (stats.usersByRole.RESIDENT ?? 0).toLocaleString(), workers: (stats.usersByRole.WORKER ?? 0).toLocaleString(),
    revenue: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(stats.totalRevenue), resolution: `${stats.avgResolutionTimeHours.toFixed(1)}h`,
  }
  return <section aria-label="Admin statistics" className="grid grid-cols-2 gap-3 lg:grid-cols-3">
    {cards.map(([label, key, Icon], index) => <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06, type: "spring", stiffness: 260, damping: 22 }} whileHover={{ y: -4 }}>
      {isLoading ? <Skeleton className="h-32 rounded-2xl" /> : <Card className="h-full rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md"><CardContent className="flex h-full flex-col justify-between gap-5 p-5"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon aria-hidden="true" /></span><div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 font-heading text-2xl font-semibold tracking-tight">{values[key]}</p></div></CardContent></Card>}
    </motion.div>)}
  </section>
}

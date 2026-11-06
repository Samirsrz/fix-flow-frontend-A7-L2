"use client"

import { motion } from "motion/react"
import { ClipboardList, Clock3, DollarSign, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { ManagerStats } from "./manager-types"

const items = [
  { key: "issues", label: "Total issues", icon: ClipboardList, tone: "bg-primary/10 text-primary" },
  { key: "residents", label: "Residents", icon: Users, tone: "bg-accent text-accent-foreground" },
  { key: "revenue", label: "Revenue", icon: DollarSign, tone: "bg-secondary text-secondary-foreground" },
  { key: "time", label: "Avg. resolution", icon: Clock3, tone: "bg-muted text-muted-foreground" },
] as const

export function ManagerStatsCards({ stats, isLoading }: { stats: ManagerStats; isLoading: boolean }) {
  const totalIssues = Object.values(stats.issuesByStatus).reduce((sum, value) => sum + value, 0)
  const values = { issues: totalIssues.toLocaleString(), residents: stats.residentCount.toLocaleString(), revenue: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, time: `${stats.avgResolutionTimeHours} hrs` }
  return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
    {items.map((item, index) => { const Icon = item.icon; return <motion.div key={item.key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.45 }}>
      <Card className="group overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"><CardContent className="flex items-center gap-3 p-4 sm:p-5"><div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${item.tone} transition-transform duration-300 group-hover:scale-110`}><Icon className="size-5" /></div><div className="min-w-0">{isLoading ? <><Skeleton className="mb-2 h-3 w-20" /><Skeleton className="h-7 w-16" /></> : <><p className="text-xs font-medium text-muted-foreground">{item.label}</p><p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{values[item.key]}</p></>}</div></CardContent></Card>
    </motion.div> })}
  </div>
}

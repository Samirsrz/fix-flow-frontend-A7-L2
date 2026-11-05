"use client"

import { ArrowDown, ArrowUp, Flame, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Priority } from "./issue-types"

const config: Record<Priority, { label: string; icon: typeof ArrowDown; className: string }> = {
  LOW: { label: "Low", icon: ArrowDown, className: "border-border bg-muted text-muted-foreground" },
  MEDIUM: { label: "Medium", icon: Minus, className: "border-primary/20 bg-primary/10 text-primary" },
  HIGH: { label: "High", icon: ArrowUp, className: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300" },
  URGENT: { label: "Urgent", icon: Flame, className: "border-destructive/20 bg-destructive/10 text-destructive" },
}

export function IssuePriorityBadge({ priority, size = "default" }: { priority: Priority; size?: "sm" | "default" }) {
  const item = config[priority]
  const Icon = item.icon
  return <Badge variant="outline" className={`${item.className} gap-1.5 ${size === "sm" ? "px-2 py-0 text-[11px]" : ""}`}><Icon className="size-3.5" />{item.label}</Badge>
}

import type { ReactNode } from "react"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { DashboardUser } from "./dashboard-sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"

type DashboardTopbarProps = { title?: string; actions?: ReactNode; user: DashboardUser }

export function DashboardTopbar({ title, actions, user }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger aria-label="Toggle navigation" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {title && <h1 className="truncate font-heading text-lg font-semibold tracking-tight">{title}</h1>}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="max-w-32 truncate text-sm font-medium">{user.name}</span>
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">{user.role}</Badge>
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}

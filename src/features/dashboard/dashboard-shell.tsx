"use client"

import type { ReactNode } from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardSidebar, type DashboardUser } from "./dashboard-sidebar"
import { DashboardTopbar } from "./dashboard-topbar"
import type { NavItem } from "./dashboard-nav"

type DashboardShellProps = {
  navItems: NavItem[]
  user: DashboardUser
  onLogout: () => void
  isLoggingOut: boolean
  title?: string
  actions?: ReactNode
  children: ReactNode
}

export function DashboardShell({ navItems, user, onLogout, isLoggingOut, title, actions, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar navItems={navItems} user={user} onLogout={onLogout} isLoggingOut={isLoggingOut} />
      <SidebarInset>
        <DashboardTopbar title={title} actions={actions} user={user} />
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

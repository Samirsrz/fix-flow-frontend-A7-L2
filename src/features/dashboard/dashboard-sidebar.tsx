"use client"

import Link from "next/link"
import { LogOut, Wrench } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { NavItem } from "./dashboard-nav"
import { usePathname } from "next/navigation"

export type DashboardUser = { name: string; email: string; role: string }

type DashboardSidebarProps = {
  navItems: NavItem[]
  user: DashboardUser
  onLogout: () => void
  isLoggingOut: boolean
}

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

const isRootHref = (href: string) => href.split("/").filter(Boolean).length === 1

const isActivePath = (pathname: string, href: string) =>
  isRootHref(href)
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)

export function DashboardSidebar({ navItems, user, onLogout, isLoggingOut }: DashboardSidebarProps) {
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="h-16 justify-center px-3">
        <Link href="/" className="flex items-center gap-2 font-heading font-semibold tracking-tight">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg group-data-[collapsible=icon]:hidden">FixFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
   {navItems.map((item) => {
  const Icon = item.icon
  const active = isActivePath(pathname, item.href)
  return (
    <SidebarMenuItem key={item.href}>
      <Tooltip>
        <TooltipTrigger
          render={
          <SidebarMenuButton
  isActive={active}
  className="data-active:bg-primary/10 data-active:font-medium data-active:text-primary data-active:hover:bg-primary/15 data-active:hover:text-primary"
  render={<Link href={item.href} aria-current={active ? "page" : undefined} />}
/>
          }
        >
          <Icon aria-hidden="true" />
          <span>{item.label}</span>
          
        </TooltipTrigger>
        <TooltipContent side="right" className="md:hidden">{item.label}</TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  )
})}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 rounded-lg p-2 group-data-[collapsible=icon]:justify-center">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/70">{user.email}</p>
            <Badge variant="secondary" className="mt-1 text-[10px] uppercase tracking-wide">{user.role}</Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} disabled={isLoggingOut} className="shrink-0 group-data-[collapsible=icon]:hidden" aria-label="Log out">
            <LogOut aria-hidden="true" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

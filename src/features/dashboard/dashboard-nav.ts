import type { LucideIcon } from "lucide-react"
import {
  Home,
  ClipboardList,
  CreditCard,
  MessageCircle,
  UserRound,
  LayoutDashboard,
  HardHat,
  Receipt,
  Briefcase,
  Users,
  Building2,
  Tag,
  ScrollText,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const residentNav: NavItem[] = [
  { label: "Home", href: "/resident", icon: Home },
  { label: "My Issues", href: "/resident/issues", icon: ClipboardList },
  { label: "Payments", href: "/resident/payments", icon: CreditCard },
  { label: "Chat", href: "/resident/chat", icon: MessageCircle },
  { label: "Profile", href: "/resident/profile", icon: UserRound },
]

export const managerNav: NavItem[] = [
  { label: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { label: "Issues", href: "/manager/issues", icon: ClipboardList },
  { label: "Workers", href: "/manager/workers", icon: HardHat },
  { label: "Invoices", href: "/manager/invoices", icon: Receipt },
  { label: "Profile", href: "/manager/profile", icon: UserRound },
]

export const workerNav: NavItem[] = [
  { label: "Dashboard", href: "/worker", icon: LayoutDashboard },
  { label: "My Jobs", href: "/worker/jobs", icon: Briefcase },
  { label: "Chat", href: "/worker/chat", icon: MessageCircle },
  { label: "Profile", href: "/worker/profile", icon: UserRound },
]

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Communities", href: "/admin/communities", icon: Building2 },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Audit Log", href: "/admin/audit-logs", icon: ScrollText },
  { label: "Profile", href: "/admin/profile", icon: UserRound },
]

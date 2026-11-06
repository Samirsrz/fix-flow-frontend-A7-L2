import type { Issue, Priority } from "../issues/issue-types"

export type ManagerStats = {
  issuesByStatus: Record<string, number>
  residentCount: number
  totalRevenue: number
  avgResolutionTimeHours: number
}

export type WorkerSummary = {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  specialization?: string
  activeJobCount: number
}

export type ResidentSummary = { id: string; name: string; email: string; unitNumber?: string }

export type InvoiceSummary = {
  id: string
  period: string
  amount: string
  dueDate: string
  status: "PENDING" | "PAID" | "OVERDUE"
  residentName: string
  residentEmail: string
}

export type ManagerIssue = Issue & { residentName: string }

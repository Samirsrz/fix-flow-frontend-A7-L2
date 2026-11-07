export type AdminStats = {
  issuesByStatus: Record<string, number>
  usersByRole: Record<string, number>
  totalRevenue: number
  avgResolutionTimeHours: number
}

export type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  status: "ACTIVE" | "BANNED"
  isDeleted: boolean
  createdAt: string
  imageUrl?: string
}

export type Community = {
  id: string
  name: string
  address: string
  city: string
  createdAt: string
  manager?: { user: { name: string; email: string } }
  residents?: { id: string }[]
}

export type Category = { id: string; name: string; description?: string; createdAt: string }

export type AuditLog = {
  id: string
  action: string
  entityType: string
  entityId: string
  createdAt: string
  metadata?: Record<string, unknown>
  actor: { name: string; email: string; role: string }
}

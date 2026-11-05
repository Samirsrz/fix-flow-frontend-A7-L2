"use client"

import { motion } from "motion/react"
import { Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type ProfileUser = {
  name: string
  email: string
  role: string
  imageUrl?: string
  phone?: string
  unitNumber?: string
  specialization?: string
}

type ProfileViewProps = {
  user: ProfileUser
  onEdit: () => void
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-6 border-b bg-muted/20 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              {user.imageUrl ? <AvatarImage src={user.imageUrl} alt={`${user.name} profile`} /> : null}
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{user.name}</h1>
              <Badge variant="secondary" className="w-fit">{user.role}</Badge>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onEdit}>
            <Pencil data-icon="inline-start" />
            Edit profile
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Phone" value={user.phone} />
            <Detail label="Unit number" value={user.unitNumber} />
            <Detail label="Specialization" value={user.specialization} />
          </dl>
        </CardContent>
      </Card>
    </motion.div>
  )
}

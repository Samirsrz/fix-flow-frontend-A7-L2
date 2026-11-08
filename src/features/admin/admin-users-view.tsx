"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Ban, Check, MoreHorizontal, Plus, Search, ShieldAlert, Trash2 } from "lucide-react"
import type { AdminUser } from "./admin-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export type CreateUserData = { name: string; email: string; password: string; role: "MANAGER" | "WORKER" | "ADMIN"; communityId?: string; phone?: string; specialization?: string }
const schema = z.object({ name: z.string().min(2, "Enter a name"), email: z.string().email("Enter a valid email"), password: z.string().min(8, "Use at least 8 characters"), role: z.enum(["MANAGER", "WORKER", "ADMIN"]), communityId: z.string().optional(), phone: z.string().optional(), specialization: z.string().optional() })
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

export function AdminUsersView({ users, isLoading, onBan, onUnban, onDelete, onCreate, isCreating, communities }: { users: AdminUser[]; isLoading: boolean; onBan: (id: string) => Promise<void>; onUnban: (id: string) => Promise<void>; onDelete: (id: string) => Promise<void>; onCreate: (data: CreateUserData) => Promise<void>; isCreating: boolean; communities: { id: string; name: string; city: string }[] }) {
  const [search, setSearch] = useState(""); const [role, setRole] = useState("ALL"); const [status, setStatus] = useState("ALL"); const [open, setOpen] = useState(false)
  const form = useForm<CreateUserData>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", password: "", role: "WORKER" } }); const selectedRole = form.watch("role")
  const filtered = useMemo(() => users.filter((user) => !user.isDeleted && (role === "ALL" || user.role === role) && (status === "ALL" || user.status === status) && `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())), [users, role, status, search])
  const submit = async (data: CreateUserData) => { await onCreate(data); form.reset(); setOpen(false) }
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  return <div className="flex flex-col gap-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="font-heading text-3xl font-semibold tracking-tight">Users</h1><p className="mt-1 text-sm text-muted-foreground">Manage residents, workers, managers, and admins.</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button><Plus data-icon="inline-start" />Create user</Button>} /><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg"><DialogHeader><DialogTitle>Create user</DialogTitle><DialogDescription>Add a new person to the FixFlow workspace.</DialogDescription></DialogHeader><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="password" render={({ field }) => <FormItem><FormLabel>Temporary password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="MANAGER">Manager</SelectItem><SelectItem value="WORKER">Worker</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />{selectedRole === "MANAGER" && <FormField control={form.control} name="communityId" render={({ field }) => <FormItem><FormLabel>Community</FormLabel>
  
<Select value={field.value} onValueChange={field.onChange}>
  <FormControl>
    <SelectTrigger>
      <SelectValue placeholder="Choose a community">
        {field.value
          ? communities.find((c) => c.id === field.value)?.name
          : "Choose a community"}
      </SelectValue>
    </SelectTrigger>
  </FormControl>
  <SelectContent>
    {communities.map((community) => (
      <SelectItem key={community.id} value={community.id}>
        {community.name} · {community.city}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  
  {/** biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
</FormItem>} />}{selectedRole === "WORKER" && <FormField control={form.control} name="specialization" render={({ field }) => <FormItem><FormLabel>Specialization</FormLabel><FormControl><Input placeholder="Plumbing, electrical..." {...field} /></FormControl></FormItem>} />}<FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone <span className="text-muted-foreground">(optional)</span></FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} /><DialogFooter><Button type="submit" disabled={isCreating}>{isCreating ? "Creating..." : "Create user"}</Button></DialogFooter></form></Form></DialogContent></Dialog></div><div className="flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search users" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" className="pl-9" /></div><div className="flex gap-2"><Select value={role} onValueChange={(value) => setRole(value ?? "ALL")}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Role" /></SelectTrigger><SelectContent><SelectItem value="ALL">All roles</SelectItem><SelectItem value="RESIDENT">Resident</SelectItem><SelectItem value="MANAGER">Manager</SelectItem><SelectItem value="WORKER">Worker</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent></Select><Select value={status} onValueChange={(value) => setStatus(value ?? "ALL")}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="ALL">All status</SelectItem><SelectItem value="ACTIVE">Active</SelectItem><SelectItem value="BANNED">Banned</SelectItem></SelectContent></Select></div></div><Card className="overflow-hidden rounded-2xl border-border/60"><CardContent className="p-0">{isLoading ? <div className="flex flex-col gap-3 p-4">{Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-16" />)}</div> : <div className="divide-y">{filtered.map((user, index) => <motion.div key={user.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .04 }} className="flex flex-col gap-3 p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><Avatar><AvatarImage src={user.imageUrl} alt="" /><AvatarFallback>{initials(user.name)}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate font-medium">{user.name}</p><p className="truncate text-sm text-muted-foreground">{user.email}</p></div></div><Badge variant="secondary">{user.role}</Badge><Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>{user.status}</Badge><span className="text-sm text-muted-foreground sm:w-28">{new Date(user.createdAt).toLocaleDateString()}</span><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`} />}><MoreHorizontal /></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem disabled={user.status === "BANNED"} onClick={() => onBan(user.id)}><Ban data-icon="inline-start" />Ban user</DropdownMenuItem><DropdownMenuItem disabled={user.status === "ACTIVE"} onClick={() => onUnban(user.id)}><Check data-icon="inline-start" />Unban user</DropdownMenuItem><DropdownMenuItem variant="destructive" onClick={() => onDelete(user.id)}><Trash2 data-icon="inline-start" />Delete user</DropdownMenuItem></DropdownMenuContent></DropdownMenu></motion.div>)}{!filtered.length && <div className="flex flex-col items-center gap-2 p-12 text-center"><ShieldAlert className="text-muted-foreground" /><p className="font-medium">No users found</p><p className="text-sm text-muted-foreground">Try changing your filters.</p></div>}</div>}</CardContent></Card></div>
}

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { MapPin, Plus, UserRound, Users } from "lucide-react"
import type { Community } from "./admin-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

const schema = z.object({ name: z.string().min(2, "Enter a community name"), address: z.string().min(3, "Enter an address"), city: z.string().min(2, "Enter a city") })
type CommunityForm = z.infer<typeof schema>

export function AdminCommunitiesView({ communities, isLoading, onCreate, isCreating }: { communities: Community[]; isLoading: boolean; onCreate: (data: CommunityForm) => Promise<void>; isCreating: boolean }) {
  const [open, setOpen] = useState(false); const form = useForm<CommunityForm>({ resolver: zodResolver(schema), defaultValues: { name: "", address: "", city: "" } })
  const submit = async (data: CommunityForm) => { await onCreate(data); form.reset(); setOpen(false) }
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  return <div className="flex flex-col gap-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="font-heading text-3xl font-semibold tracking-tight">Communities</h1><p className="mt-1 text-sm text-muted-foreground">Keep every neighborhood organized and connected.</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button><Plus data-icon="inline-start" />Add community</Button>} /><DialogContent><DialogHeader><DialogTitle>Add community</DialogTitle><DialogDescription>Create a new neighborhood for FixFlow.</DialogDescription></DialogHeader><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Lakeside Gardens" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="address" render={({ field }) => <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="14 Park Lane" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="city" render={({ field }) => <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Austin" {...field} /></FormControl><FormMessage /></FormItem>} /><DialogFooter><Button type="submit" disabled={isCreating}>{isCreating ? "Adding..." : "Add community"}</Button></DialogFooter></form></Form></DialogContent></Dialog></div><div className="grid gap-4 lg:grid-cols-2">{isLoading ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-48 rounded-2xl" />) : communities.map((community, index) => <motion.div key={community.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06, type: "spring", stiffness: 240, damping: 24 }} whileHover={{ y: -5 }}><Card className="h-full rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md"><CardContent className="flex h-full flex-col gap-5 p-5"><div><h2 className="font-heading text-xl font-semibold">{community.name}</h2><div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 shrink-0" />{community.address}, {community.city}</div></div><div className="mt-auto grid gap-3 border-t pt-4 text-sm"><div className="flex items-center gap-2"><UserRound className="text-muted-foreground" />{community.manager ? <span>{community.manager.user.name}</span> : <span className="text-muted-foreground">No manager assigned</span>}</div><div className="flex items-center justify-between"><span className="flex items-center gap-2"><Users className="text-muted-foreground" />{community.residents?.length ?? 0} residents</span><span className="text-xs text-muted-foreground">{new Date(community.createdAt).toLocaleDateString()}</span></div></div></CardContent></Card></motion.div>)}</div></div>
}

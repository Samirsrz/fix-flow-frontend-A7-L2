"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Plus, Tag } from "lucide-react"
import type { Category } from "./admin-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({ name: z.string().min(2, "Enter a category name"), description: z.string().optional() })
type CategoryForm = z.infer<typeof schema>

export function AdminCategoriesView({ categories, isLoading, onCreate, isCreating }: { categories: Category[]; isLoading: boolean; onCreate: (data: CategoryForm) => Promise<void>; isCreating: boolean }) {
  const [open, setOpen] = useState(false); const form = useForm<CategoryForm>({ resolver: zodResolver(schema), defaultValues: { name: "", description: "" } })
  const submit = async (data: CategoryForm) => { await onCreate(data); form.reset(); setOpen(false) }
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  return <div className="flex flex-col gap-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="font-heading text-3xl font-semibold tracking-tight">Categories</h1><p className="mt-1 text-sm text-muted-foreground">Organize reports into clear, actionable categories.</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button><Plus data-icon="inline-start" />Add category</Button>} /><DialogContent><DialogHeader><DialogTitle>Add category</DialogTitle><DialogDescription>Create a label residents can use when reporting an issue.</DialogDescription></DialogHeader><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Street lighting" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>Description <span className="text-muted-foreground">(optional)</span></FormLabel><FormControl><Textarea placeholder="Help residents choose this category" {...field} /></FormControl></FormItem>} /><DialogFooter><Button type="submit" disabled={isCreating}>{isCreating ? "Adding..." : "Add category"}</Button></DialogFooter></form></Form></DialogContent></Dialog></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">{isLoading ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-44 rounded-2xl" />) : categories.map((category, index) => <motion.div key={category.id} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * .04, type: "spring", stiffness: 250, damping: 22 }} whileHover={{ y: -4 }}><Card className="h-full rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md"><CardContent className="flex h-full flex-col gap-4 p-5"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Tag aria-hidden="true" /></span><div><h2 className="font-heading font-semibold">{category.name}</h2><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{category.description || "No description provided."}</p></div><p className="mt-auto text-xs text-muted-foreground">Issue count unavailable</p></CardContent></Card></motion.div>)}</div></div>
}

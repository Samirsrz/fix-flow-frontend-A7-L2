"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Loader2, MapPin, Home } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
export type Community = { id: string; name: string; city: string }

const schema = z.object({ communityId: z.string().min(1), unitNumber: z.string().optional() })
export type CompleteProfileValues = z.infer<typeof schema>
type Props = { onSubmit: (values: CompleteProfileValues) => Promise<void>; isLoading: boolean; communities: Community[] }
export default function CompleteProfileForm({ onSubmit, isLoading, communities }: Props) { const form = useForm<CompleteProfileValues>({ resolver: zodResolver(schema), defaultValues: { communityId: "", unitNumber: "" } }); return <main className="flex min-h-svh items-center justify-center bg-muted/30 px-6 py-12"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="w-full max-w-md"><Card className="rounded-2xl"><CardHeader className="text-center"><Link href="/" className="mb-5 inline-flex items-center justify-center gap-2 font-heading text-xl font-bold"><MapPin className="size-5"/>FixFlow</Link><CardTitle className="font-heading text-3xl">One last step</CardTitle><CardDescription>Pick your community to finish setting up your account.</CardDescription></CardHeader><CardContent><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5"><FormField control={form.control} name="communityId" render={({ field }) => <FormItem><FormLabel>Community</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your community"/></SelectTrigger></FormControl><SelectContent>{communities.map((community) => <SelectItem key={community.id} value={community.id}>{community.name} · {community.city}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>}/><FormField control={form.control} name="unitNumber" render={({ field }) => <FormItem><FormLabel>Unit number <span className="font-normal text-muted-foreground">(optional)</span></FormLabel><FormControl><Input placeholder="e.g. 4B" {...field}/></FormControl><FormMessage/></FormItem>}/><Button type="submit" disabled={isLoading} className="w-full">{isLoading && <Loader2 data-icon="inline-start" className="animate-spin"/>}{isLoading ? "Saving…" : "Complete setup"}</Button></form></Form><div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Home className="size-3.5"/>Your details stay within your community.</div></CardContent></Card></motion.div></main> }

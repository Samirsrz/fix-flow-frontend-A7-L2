"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Loader2, Mail, Inbox, ShieldCheck } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const schema = z.object({ email: z.string().email() })
export type ForgotPasswordValues = z.infer<typeof schema>
type Props = { onSubmit: (values: ForgotPasswordValues) => Promise<void>; isLoading: boolean }

export default function ForgotPasswordForm({ onSubmit, isLoading }: Props) {
  const form = useForm<ForgotPasswordValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } })
  return <main className="grid min-h-svh lg:grid-cols-2"><aside className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-20 top-16 size-72 rounded-full bg-primary-foreground/10 blur-3xl"/><Link href="/" className="relative font-heading text-2xl font-bold">FixFlow</Link><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="relative max-w-md"><p className="mb-3 text-sm font-medium text-primary-foreground/70">Reset your password</p><h1 className="font-heading text-4xl font-bold tracking-tight">A fresh start is only a few steps away.</h1><ul className="mt-10 flex flex-col gap-5 text-sm text-primary-foreground/80"><li className="flex items-center gap-3"><Mail className="size-5"/>Enter your registered email</li><li className="flex items-center gap-3"><Inbox className="size-5"/>Check your inbox for an OTP</li><li className="flex items-center gap-3"><ShieldCheck className="size-5"/>Set a new secure password</li></ul></motion.div><p className="relative text-xs text-primary-foreground/50">We&apos;ll help you get back in securely.</p></aside><section className="flex items-center justify-center px-6 py-12"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="w-full max-w-md"><div className="mb-8 lg:hidden"><Link href="/" className="font-heading text-2xl font-bold">FixFlow</Link></div><div className="mb-8"><h2 className="font-heading text-3xl font-bold tracking-tight">Forgot your password?</h2><p className="mt-2 text-muted-foreground">We&apos;ll send a verification code to your email.</p></div><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5"><FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field}/></FormControl><FormMessage/></FormItem>}/><Button type="submit" disabled={isLoading} className="w-full">{isLoading && <Loader2 data-icon="inline-start" className="animate-spin"/>}{isLoading ? "Sending…" : "Send OTP"}</Button></form></Form><p className="mt-6 text-center text-sm"><Link href="/login" className="font-medium text-primary hover:underline">Back to login</Link></p></motion.div></section></main>
}

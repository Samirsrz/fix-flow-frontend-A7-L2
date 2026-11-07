"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PaymentSuccessPage({ sessionId }: { sessionId?: string }) {
  return <main className="flex min-h-svh items-center justify-center bg-gradient-to-b from-primary/[0.04] to-background px-4 py-12"><motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center"><motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 15 }} className="mx-auto flex size-24 items-center justify-center rounded-full border-8 border-primary/10 bg-primary/10 text-primary"><svg viewBox="0 0 52 52" className="size-14" aria-hidden="true"><motion.circle cx="26" cy="26" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} /><motion.path d="M16 27.5 23 34l14-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.65, duration: 0.45 }} /></svg></motion.div><h1 className="mt-7 font-heading text-3xl font-semibold tracking-tight">Payment successful</h1><p className="mt-3 text-muted-foreground">Your maintenance fee has been processed.</p>{sessionId && <p className="mt-3 text-xs text-muted-foreground">Confirmation: {sessionId}</p>}<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><Button render={<Link href="/resident/payment" />} className="rounded-xl"><Check data-icon="inline-start" />Back to payments</Button><Button render={<Link href="/resident" />} variant="outline" className="rounded-xl">Go to dashboard</Button></div></motion.section></main>
}

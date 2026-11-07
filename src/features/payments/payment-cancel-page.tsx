"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PaymentCancelPage() {
  return <main className="flex min-h-svh items-center justify-center bg-gradient-to-b from-destructive/[0.04] to-background px-4 py-12"><motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center"><motion.div initial={{ scale: 0.65, rotate: -10, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="mx-auto flex size-24 items-center justify-center rounded-full border-8 border-destructive/10 bg-destructive/10 text-destructive"><X className="size-12" strokeWidth={2.5} /></motion.div><h1 className="mt-7 font-heading text-3xl font-semibold tracking-tight">Payment cancelled</h1><p className="mt-3 text-muted-foreground">Your payment was not completed. You can try again from your invoices.</p><Button render={<Link href="/resident/payment" />} variant="outline" className="mt-8 rounded-xl"><ArrowLeft data-icon="inline-start" />Back to invoices</Button></motion.section></main>
}

"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Wrench, LoaderCircle } from "lucide-react"

const loadingMessages = [
  "Loading your workspace...",
  "Fetching your data...",
  "Almost ready...",
]

export function LoadingScreen() {
  const reduceMotion = useReducedMotion()
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % loadingMessages.length)
    }, 800)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Wrench aria-hidden="true" className="size-5" />
            </div>
            <span className="font-heading text-2xl font-semibold tracking-tight">FixFlow</span>
          </div>
          <LoaderCircle aria-label="Loading" className="size-5 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{loadingMessages[messageIndex]}</p>
        </div>
      </main>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 size-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, -32, 0], y: [0, -28, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex w-full max-w-xs flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex items-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Wrench aria-hidden="true" className="size-5" />
          </div>
          <span className="font-heading text-2xl font-semibold tracking-tight">FixFlow</span>
        </motion.div>

        <div className="w-full space-y-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-primary/10">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingMessages[messageIndex]}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  )
}

export default LoadingScreen

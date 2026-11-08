"use client"

import { motion, useReducedMotion } from "motion/react"

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
      {/** biome-ignore lint/a11y/useSemanticElements: <explanation> */}
<div className="flex items-center gap-1.5" aria-label={message} role="status">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="size-2 rounded-full bg-primary"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.9, repeat: Infinity, delay: index * 0.14, ease: "easeInOut" }
            }
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

export default PageLoader

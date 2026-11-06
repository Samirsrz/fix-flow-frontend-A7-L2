"use client"

import { motion } from "motion/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { ChatMessage } from "./chat-box"

export function ChatMessageBubble({ message, isOwn }: { message: ChatMessage; isOwn: boolean }) {
  const initials = message.senderName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

  return (
    <motion.div
      initial={{ opacity: 0, x: isOwn ? 20 : -20, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
      className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      {!isOwn && <Avatar className="size-8 shrink-0 ring-2 ring-background"><AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{initials}</AvatarFallback></Avatar>}
      <div className={`flex max-w-[82%] flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-foreground">{message.senderName}</span>
          {!isOwn && <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{message.senderRole}</Badge>}
        </div>
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${isOwn ? "rounded-br-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-primary/15" : "rounded-bl-md bg-muted text-foreground"}`}>
          {message.content}
        </div>
        <span className="px-1 text-[10px] text-muted-foreground">{time}</span>
      </div>
    </motion.div>
  )
}

export { ChatMessageBubble as ChatMessage }

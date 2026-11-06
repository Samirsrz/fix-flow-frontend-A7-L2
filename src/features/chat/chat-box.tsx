"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "motion/react"
import { Bot, CalendarDays, MessageCircle, Send, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage as ChatMessageBubble } from "./chat-message"

export type ChatMessage = {
  id: string
  content: string
  senderId: string
  senderName: string
  senderRole: string
  createdAt: string
}

type ChatBoxProps = {
  messages: ChatMessage[]
  currentUserId: string
  isLoading: boolean
  isSending: boolean
  onSend: (content: string) => Promise<void>
  issueTitle: string
}

function dateLabel(value: string) {
  const date = new Date(value)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

export function ChatBox({ messages, currentUserId, isLoading, isSending, onSend, issueTitle }: ChatBoxProps) {
  const [draft, setDraft] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  const groupedMessages = useMemo(() => messages.map((message, index) => ({ message, showDate: index === 0 || dateLabel(message.createdAt) !== dateLabel(messages[index - 1].createdAt) })), [messages])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [])

  async function submit() {
    const content = draft.trim()
    if (!content || isSending) return
    setDraft("")
    try { await onSend(content) } catch { setDraft(content) }
  }

  return (
    <Card className="relative flex h-[400px] flex-col overflow-hidden border-border/70 bg-gradient-to-b from-primary/[0.035] via-card to-background shadow-lg shadow-primary/5 sm:h-[500px]">
      <CardHeader className="flex shrink-0 flex-row items-center gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><MessageCircle className="size-4" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2"><h2 className="font-heading text-sm font-semibold">Chat</h2><Badge variant="outline" className="gap-1 text-[10px]"><span className="size-1.5 rounded-full bg-primary" />Live</Badge></div>
          <p className="truncate text-xs text-muted-foreground">{issueTitle}</p>
        </div>
      </CardHeader>

      <div className="relative min-h-0 flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-card/80 to-transparent" />
        <ScrollArea className="h-full">
          <CardContent className="flex min-h-full flex-col gap-4 px-4 py-5 sm:px-5">
            {/** biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
{isLoading ? <div className="flex flex-col gap-4">{["left", "right", "left", "right"].map((side, index) => <div key={index} className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}><Skeleton className={`h-16 rounded-2xl ${index % 2 ? "w-2/3" : "w-3/4"}`} /></div>)}</div> : messages.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="m-auto flex flex-col items-center gap-3 text-center">
                <motion.div animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="size-6" /></motion.div>
                <div><p className="text-sm font-medium">No messages yet</p><p className="mt-1 text-xs text-muted-foreground">Start the conversation.</p></div>
              </motion.div>
            ) : groupedMessages.map(({ message, showDate }) => <div key={message.id} className="flex flex-col gap-3">{showDate && <div className="flex items-center gap-3 py-1"><div className="h-px flex-1 bg-border/70" /><Badge variant="secondary" className="rounded-full px-3 text-[10px] font-medium"><CalendarDays className="mr-1 size-3" />{dateLabel(message.createdAt)}</Badge><div className="h-px flex-1 bg-border/70" /></div>}<ChatMessageBubble message={message} isOwn={message.senderId === currentUserId} /></div>)}
            <div ref={endRef} />
          </CardContent>
        </ScrollArea>
      </div>

      <div className="shrink-0 border-t border-border/60 bg-card/80 p-3 backdrop-blur-sm sm:p-4">
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <Textarea value={draft} maxLength={500} rows={1} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); void submit() } }} placeholder="Write a message..." disabled={isSending} className="max-h-24 min-h-10 resize-none rounded-xl border-border/70 bg-background/80 py-2.5 shadow-inner transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40" aria-label="Message" />
            {draft.length > 400 && <p className="mt-1 text-right text-[10px] text-muted-foreground">{draft.length}/500</p>}
          </div>
          <motion.div whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><Button type="button" size="icon" onClick={() => void submit()} disabled={!draft.trim() || isSending} aria-label="Send message" className="size-10 shrink-0 rounded-xl shadow-sm shadow-primary/20"><Send className="size-4" /></Button></motion.div>
        </div>
        <p className="mt-2 hidden items-center gap-1 text-[10px] text-muted-foreground sm:flex"><Bot className="size-3" />Press Enter to send, Shift + Enter for a new line</p>
      </div>
    </Card>
  )
}

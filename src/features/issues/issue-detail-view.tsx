
"use client"

import { useState, type ChangeEvent } from "react"
import type React from "react"
import { motion } from "motion/react"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ImageIcon,
  MapPin,
  MessageSquare,
  Send,
  Star,
  Wrench,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

import { IssuePriorityBadge } from "./issue-priority-badge"
import { IssueStatusBadge } from "./issue-status-badge"
import type { Issue, WorkerUpdate } from "./issue-types"

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function IssueDetailView({
  issue,
  updates,
  isLoading,
  onConfirm,
  onDispute,
  onBack,
}: {
  issue: Issue
  updates: WorkerUpdate[]
  isLoading: boolean
  onConfirm: (rating: number, comment?: string) => Promise<void>
  onDispute: (comment?: string) => Promise<void>
  onBack: () => void
}) {
  const [action, setAction] = useState<"confirm" | "dispute" | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 -ml-2"
      >
        <ArrowLeft data-icon="inline-start" />
        Back to my issues
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        {/* Issue Header */}
        <header>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              {issue.categoryName}
            </span>

            <IssueStatusBadge status={issue.status} />

            {issue.priority && (
              <IssuePriorityBadge priority={issue.priority} />
            )}
          </div>

          <h1 className="font-heading max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {issue.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {issue.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {issue.location}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              Reported {formatDate(issue.createdAt)}
            </span>

            <span>Updated {formatDate(issue.updatedAt)}</span>
          </div>
        </header>

        {/* Issue Description */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              What's happening
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {issue.description}
            </p>
          </CardContent>
        </Card>

        {/* Issue Photos */}
        {issue.images?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg">
                <ImageIcon className="size-5 text-primary" />
                Photos
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {issue.images.map((src, index) => (
                  <div
                    key={`${src}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
index}`}
                    className="aspect-square overflow-hidden rounded-xl border bg-muted"
                  >
                    {/** biome-ignore lint/performance/noImgElement: <explanation> */}
<img
                      src={src}
                      // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                      alt={`Issue photo ${index + 1}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assigned Worker */}
        {issue.assignedWorker && (
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Avatar className="size-12">
                <AvatarFallback>
                  {initials(issue.assignedWorker.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm text-muted-foreground">
                  Assigned to
                </p>

                <p className="font-semibold">
                  {issue.assignedWorker.name}
                </p>

                {issue.assignedWorker.specialization && (
                  <p className="text-sm text-muted-foreground">
                    {issue.assignedWorker.specialization}
                  </p>
                )}
              </div>

              <Wrench className="ml-auto size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        )}

        {/* Worker Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <MessageSquare className="size-5 text-primary" />
              Worker updates
            </CardTitle>
          </CardHeader>

          <CardContent>
            {updates.length ? (
              <div className="flex flex-col gap-6">
                {updates.map((update, index) => (
                  <motion.article
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    key={update.id}
                    className="relative pl-7 before:absolute before:top-2 before:left-1.5 before:h-full before:w-px before:bg-border last:before:hidden"
                  >
                    <span className="absolute top-1 left-0 size-3.5 rounded-full border-2 border-background bg-primary ring-2 ring-primary/20" />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">
                        {update.workerName}
                      </p>

                      <time className="text-xs text-muted-foreground">
                        {formatDate(update.createdAt)}
                      </time>
                    </div>

                    {update.note && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {update.note}
                      </p>
                    )}

                    {update.materials && (
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Materials:</span>{" "}
                        <span className="text-muted-foreground">
                          {update.materials}
                        </span>
                      </p>
                    )}

                    {/* Worker Update Photos */}
                    {update.images?.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {update.images.map((image, imageIndex) => (
                          <div
                            key={`${image}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
imageIndex}`}
                            className="aspect-square overflow-hidden rounded-lg border bg-muted"
                          >
                            {/** biome-ignore lint/performance/noImgElement: <explanation> */}
<img
                              src={image}
                              // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                              alt={`Worker update photo ${imageIndex + 1}`}
                              loading="lazy"
                              className="size-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted">
                  <MessageSquare className="size-5 text-muted-foreground" />
                </div>

                <p className="font-medium">No updates yet</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  We'll post progress here as work begins.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm or Dispute Resolution */}
        {issue.status === "PENDING_CONFIRMATION" && (
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                How did we do?
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Take a moment to confirm the fix or let us know if something
                still needs attention.
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setAction("confirm")}>
                  <Check data-icon="inline-start" />
                  Confirm fix
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setAction("dispute")}
                >
                  <MessageSquare data-icon="inline-start" />
                  Dispute
                </Button>
              </div>

              <AnimatePanel visible={action === "confirm"}>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="mb-3 text-sm font-medium">
                    Rate the fix
                  </p>

                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        type="button"
                        key={value}
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        aria-pressed={value === rating}
                        onClick={() => setRating(value)}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-amber-500"
                      >
                        <Star
                          className={`size-6 ${
                            value <= rating
                              ? "fill-amber-400 text-amber-400"
                              : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <Textarea
                    value={comment}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setComment(event.target.value)
                    }
                    placeholder="Add an optional comment"
                  />

                  <Button
                    className="mt-4"
                    disabled={isLoading || rating === 0}
                    onClick={() => onConfirm(rating, comment || undefined)}
                  >
                    {isLoading ? "Saving..." : "Confirm resolution"}
                    <Send data-icon="inline-end" />
                  </Button>
                </div>
              </AnimatePanel>

              <AnimatePanel visible={action === "dispute"}>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="mb-3 text-sm font-medium">
                    What still needs attention?
                  </p>

                  <Textarea
                    value={comment}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setComment(event.target.value)
                    }
                    placeholder="Add an optional note"
                  />

                  <Button
                    variant="destructive"
                    className="mt-4"
                    disabled={isLoading}
                    onClick={() => onDispute(comment || undefined)}
                  >
                    {isLoading ? "Sending..." : "Submit dispute"}
                    <Send data-icon="inline-end" />
                  </Button>
                </div>
              </AnimatePanel>
            </CardContent>
          </Card>
        )}

        {/* Submitted Feedback */}
        {issue.status === "CLOSED" && issue.feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg">
                <Star className="size-5 text-amber-500" />
                Your feedback
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`size-5 ${
                      value <= issue.feedback!.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>

              {issue.feedback.comment && (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  "{issue.feedback.comment}"
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </main>
  )
}

function AnimatePanel({
  visible,
  children,
}: {
  visible: boolean
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: visible ? "auto" : 0,
        opacity: visible ? 1 : 0,
      }}
      className={
        visible
          ? "overflow-hidden"
          : "pointer-events-none overflow-hidden"
      }
    >
      {children}
    </motion.div>
  )
}

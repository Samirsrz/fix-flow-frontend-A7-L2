"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AnimatePresence, motion } from "motion/react"
import { ImagePlus, Plus, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({ note: z.string().optional(), materials: z.string().optional() })
type Values = z.infer<typeof schema>

export function WorkerProgressForm({ issueId, onSubmit, isLoading }: { issueId: string; onSubmit: (data: FormData) => Promise<void>; isLoading: boolean }) {
  const [open, setOpen] = useState(false); const [files, setFiles] = useState<File[]>([]); const inputRef = useRef<HTMLInputElement>(null); const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { note: "", materials: "" } })
  const addFiles = (incoming: FileList | null) => { if (!incoming) return; setFiles((current) => [...current, ...Array.from(incoming).filter((file) => file.type.startsWith("image/")).slice(0, 5 - current.length)]) }
  // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
  const submit = async (values: Values) => { const data = new FormData(); data.append("issueId", issueId); data.append("note", values.note ?? ""); data.append("materials", values.materials ?? ""); files.forEach((file) => data.append("images", file)); await onSubmit(data); form.reset(); setFiles([]); setOpen(false) }
  return <Card className="overflow-hidden"><CardHeader className="flex flex-row items-center justify-between gap-4"><div><CardTitle className="font-heading text-lg">Progress updates</CardTitle><p className="mt-1 text-sm text-muted-foreground">Keep the resident in the loop.</p></div><Button variant={open ? "ghost" : "outline"} size="sm" onClick={() => setOpen((value) => !value)}>{open ? <X data-icon="inline-start" /> : <Plus data-icon="inline-start" />}{open ? "Cancel" : "Add progress update"}</Button></CardHeader><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><CardContent className="border-t border-border pt-5"><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-5"><FormField control={form.control} name="note" render={({ field }) => <FormItem><FormLabel>What did you do?</FormLabel><FormControl><Textarea rows={4} placeholder="Describe the work you completed..." {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="materials" render={({ field }) => <FormItem><FormLabel>Materials used</FormLabel><FormControl><Input placeholder="e.g. PVC pipe, wrench" {...field} /></FormControl><FormMessage /></FormItem>} /><div><p className="mb-2 text-sm font-medium">Photos</p><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files) }} className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-7 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5"><Upload className="size-5 text-primary" /><span>Drop photos here or click to browse</span><span className="text-xs">Up to 5 images</span></button><input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => addFiles(event.target.files)} />{files.length > 0 && <div className="mt-3 grid grid-cols-5 gap-2">{files.map((file, index) => <div key={`${file.name}-${// biome-ignore lint/performance/noImgElement: <explanation>
// biome-ignore lint/a11y/noRedundantAlt: <explanation>
index}`} className="group relative aspect-square overflow-hidden rounded-lg bg-muted"><img src={URL.createObjectURL(file)} alt="Selected progress photo" className="size-full object-cover" /><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 rounded-full bg-background/90 p-1 opacity-0 transition-opacity group-hover:opacity-100"><Trash2 className="size-3.5 text-destructive" /></button></div>)}</div>}</div><Button type="submit" disabled={isLoading} className="w-full"><ImagePlus data-icon="inline-start" />{isLoading ? "Posting update..." : "Post update"}</Button></form></Form></CardContent></motion.div>}</AnimatePresence></Card>
}

"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, ImagePlus, MapPin, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Category } from "./issue-types"

const schema = z.object({ title: z.string().min(3, "Give your issue a clear title"), categoryId: z.string().min(1, "Choose a category"), description: z.string().min(10, "Add a little more detail"), location: z.string().optional() })
type Values = z.infer<typeof schema>

export function ReportIssueForm({ categories, onSubmit, isLoading, onCancel }: { categories: Category[]; onSubmit: (data: FormData) => Promise<void>; isLoading: boolean; onCancel: () => void }) {
  const [step, setStep] = useState(1); const [files, setFiles] = useState<File[]>([]); const inputRef = useRef<HTMLInputElement>(null)
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { title: "", categoryId: "", description: "", location: "" } })
  const addFiles = (incoming: FileList | null) => { if (!incoming) return; setFiles((current) => [...current, ...Array.from(incoming).filter((file) => file.type.startsWith("image/") && !current.some((item) => item.name === file.name)).slice(0, 5 - current.length)]) }
  // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
  const submit = async (values: Values) => { const data = new FormData(); Object.entries(values).forEach(([key, value]) => data.append(key, value ?? "")); files.forEach((file) => data.append("images", file)); await onSubmit(data) }
  
  return <Card className="mx-auto w-full max-w-2xl overflow-hidden"><CardHeader className="border-b border-border bg-muted/20"><div className="mb-3 flex items-center justify-between text-xs font-medium text-muted-foreground"><span>Step {step} of 2</span><span>{step === 1 ? "Issue details" : "Add photos"}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-primary" animate={{ width: step === 1 ? "50%" : "100%" }} /></div><CardTitle className="pt-4 font-heading text-2xl">Report a community issue</CardTitle></CardHeader><CardContent className="p-5 sm:p-8"><Form {...form}><form onSubmit={(e) => e.preventDefault()}>{<AnimatePresence mode="wait">{step === 1 ? <motion.div key="details" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="flex flex-col gap-5"><FormField control={form.control} name="title" render={({ field, fieldState }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g. Pothole on Main Street" aria-invalid={fieldState.invalid} {...field} /></FormControl><FormMessage>{fieldState.error?.message}</FormMessage></FormItem>} /><FormField control={form.control} name="categoryId" render={({ field, fieldState }) => <FormItem><FormLabel>Category</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
  <SelectValue placeholder="Select a category">
    {field.value
      ? categories.find((c) => c.id === field.value)?.name
      : "Select a category"}
  </SelectValue>
</SelectTrigger></FormControl><SelectContent>{categories.map((category) => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>)}</SelectContent></Select><FormMessage>{fieldState.error?.message}</FormMessage></FormItem>} /><FormField control={form.control} name="description" render={({ field, fieldState }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={5} placeholder="Tell us what you noticed..." aria-invalid={fieldState.invalid} {...field} /></FormControl><FormMessage>{fieldState.error?.message}</FormMessage></FormItem>} /><FormField control={form.control} name="location" render={({ field }) => <FormItem><FormLabel>Location <span className="font-normal text-muted-foreground">(optional)</span></FormLabel><FormControl><div className="relative"><MapPin className="absolute top-2.5 left-3 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Street, landmark, or area" {...field} /></div></FormControl></FormItem>} /></motion.div> : <motion.div key="photos" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="flex flex-col gap-5"><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files) }} className="flex min-h-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"><span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Upload className="size-6" /></span><span className="font-medium">Drag photos here or click to browse</span><span className="mt-2 text-sm text-muted-foreground">PNG, JPG, or WEBP · Up to 5 photos</span><input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => addFiles(event.target.files)} /></button>{files.length > 0 && <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{files.map((file, index) => <div key={`${file.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"><img src={URL.createObjectURL(file)} alt="Selected issue" className="size-full object-cover" /><button type="button" onClick={() => setFiles((current) => current.filter((_, item) => item !== index))} aria-label={`Remove photo ${index + 1}`} className="absolute top-1 right-1 rounded-full bg-background/90 p-1.5 text-destructive opacity-0 transition-opacity group-hover:opacity-100"><Trash2 className="size-3.5" /></button></div>)}</div>}<div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground"><ImagePlus className="size-4 shrink-0" />Photos help the city team verify and prioritize your report.</div></motion.div>}</AnimatePresence>}<div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
  <Button
    type="button"
    variant="ghost"
    onClick={step === 1 ? onCancel : () => setStep(1)}
  >
    <ArrowLeft data-icon="inline-start" />
    {step === 1 ? "Cancel" : "Back"}
  </Button>

  {step === 1 ? (
    <Button
      type="button"
      onClick={async () => {
        const valid = await form.trigger();
        if (valid) setStep(2);
      }}
    >
      Continue
      <ArrowRight data-icon="inline-end" />
    </Button>
  ) : (
    <Button
      type="button"
      disabled={isLoading}
      onClick={() => form.handleSubmit(submit)()}
    >
      {isLoading ? "Submitting..." : "Submit report"}
      <Check data-icon="inline-end" />
    </Button>
  )}
</div></form></Form></CardContent></Card>
}

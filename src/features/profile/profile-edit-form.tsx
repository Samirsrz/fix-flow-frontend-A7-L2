"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  phone: z.string().optional(),
  unitNumber: z.string().optional(),
  specialization: z.string().optional(),
})

export type ProfileValues = z.infer<typeof profileSchema>

type ProfileEditFormProps = {
  defaultValues: ProfileValues
  role: string
  onSubmit: (values: ProfileValues) => Promise<void>
  onCancel: () => void
  isLoading: boolean
}

export function ProfileEditForm({ defaultValues, role, onSubmit, onCancel, isLoading }: ProfileEditFormProps) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultValues.name,
      phone: defaultValues.phone ?? "",
      unitNumber: defaultValues.unitNumber ?? "",
      specialization: defaultValues.specialization ?? "",
    },
  })

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Edit profile</h2>
            <p className="text-sm text-muted-foreground">Keep your FixFlow contact details up to date.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField control={form.control} name="name" render={({ field, fieldState }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} aria-invalid={fieldState.invalid} /></FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input type="tel" {...field} aria-invalid={fieldState.invalid} /></FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )} />
            {role === "RESIDENT" ? (
              <FormField control={form.control} name="unitNumber" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Unit number</FormLabel>
                  <FormControl><Input {...field} aria-invalid={fieldState.invalid} /></FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )} />
            ) : null}
            {role === "WORKER" ? (
              <FormField control={form.control} name="specialization" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl><Input {...field} aria-invalid={fieldState.invalid} /></FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )} />
            ) : null}
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 data-icon="inline-start" className="animate-spin" /> : null}
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

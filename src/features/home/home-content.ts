import { Camera, UserCheck, Activity, MessageCircle, Star, CreditCard, type LucideIcon } from 'lucide-react'

export type Feature = { title: string; description: string; icon: LucideIcon; wide?: boolean }
export type Role = { id: string; label: string; heading: string; description: string; checklist: string[] }

export const features: Feature[] = [
  { title: 'Photo-proof reporting', description: 'Report with up to 5 photos attached.', icon: Camera, wide: true },
  { title: 'Smart assignment', description: 'Managers set priority and pick the right worker.', icon: UserCheck },
  { title: 'Live status tracking', description: 'Follow every issue from reported to closed.', icon: Activity },
  { title: 'Resident–worker chat', description: 'Talk directly about the job in real time.', icon: MessageCircle },
  { title: 'Confirm and rate', description: 'Approve the fix or reopen it for another attempt.', icon: Star, wide: true },
  { title: 'Online fee payments', description: "Pay monthly maintenance invoices securely via Stripe.", icon: CreditCard },
]

export const roles: Role[] = [
  { id: 'residents', label: 'Residents', heading: 'A clearer way to get help', description: 'Report what needs attention, stay informed as work moves forward, and confirm the result when it is done.', checklist: ['Add photos and useful details', 'Track every status change', 'Chat with the assigned worker', 'Confirm or dispute the repair'] },
  { id: 'managers', label: 'Managers', heading: 'Keep the whole community moving', description: 'Turn a busy issue queue into an organized daily workflow with clear priorities and accountability.', checklist: ['Review and prioritize reports', 'Assign the right worker', 'Monitor overdue work', 'Keep residents updated'] },
  { id: 'workers', label: 'Workers', heading: 'Finish jobs with confidence', description: 'See exactly what needs doing, communicate on the job, and leave proof that the work is complete.', checklist: ['Open a focused job list', 'Share progress in chat', 'Upload completion proof', 'Close the job with a note'] },
]

export const faqs = [
  ['Who can create an account?', 'Residents self-register. Manager, worker and admin accounts are created by a platform admin.'],
  ['Can I attach photos to a report?', 'Yes, up to five photos per issue.'],
  ['How do I pay my maintenance fee?', "Each invoice has a Pay button that opens Stripe's secure hosted checkout."],
  ["What if the repair isn't done properly?", 'Dispute it. The issue reopens and the manager assigns a new attempt.'],
] as const

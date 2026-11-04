import type { LucideIcon } from 'lucide-react'
import { ClipboardPenLine, UserRoundCheck, Wrench, CircleCheck } from 'lucide-react'

export type HeroStep = {
  id: 'report' | 'assign' | 'fix' | 'confirm'
  label: string
  title: string
  description: string
  icon: LucideIcon
  status: string
}

export const heroSteps: HeroStep[] = [
  { id: 'report', label: 'Report', title: 'Report in seconds', description: 'Share the issue and add the details your manager needs.', icon: ClipboardPenLine, status: 'Reported' },
  { id: 'assign', label: 'Assign', title: 'Assigned to the right person', description: 'Managers route every request to the right specialist.', icon: UserRoundCheck, status: 'Assigned' },
  { id: 'fix', label: 'Fix', title: 'Fixed, with proof', description: 'Workers log the work and upload clear before-and-after proof.', icon: Wrench, status: 'In progress' },
  { id: 'confirm', label: 'Confirm', title: "You confirm. Then it's closed", description: 'Residents confirm the repair and rate the experience.', icon: CircleCheck, status: 'Closed' },
]

import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Camera,
  Check,
  CreditCard,
  MessageCircle,
  Star,
  UserCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/features/home/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "See how FixFlow handles issue reporting, assignment, repairs, chat, ratings and maintenance fee payments.",
};

const steps = [
  {
    id: "how-it-works",
    step: "01",
    title: "Resident reports an issue",
    description:
      "A resident submits a title, description, location and up to five photos. The report lands instantly in the manager's queue.",
    icon: Camera,
  },
  {
    step: "02",
    title: "Manager reviews and assigns",
    description:
      "The manager sets a priority level and assigns the right maintenance worker. The resident and worker both get notified.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Worker starts and logs progress",
    description:
      "The worker accepts the job, logs progress notes and photos, and marks it done when finished.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Resident confirms or disputes",
    description:
      "The resident reviews the work. If it looks good, they confirm and leave a 1–5 star rating. If not, they dispute and it reopens.",
    icon: Star,
  },
];

const extras = [
  {
    id: "residents",
    title: "For residents",
    icon: Camera,
    items: [
      "Submit issues with up to 5 photos",
      "Track status in real time",
      "Chat with the assigned worker",
      "Confirm repairs or dispute them",
      "Pay monthly maintenance invoices online",
    ],
  },
  {
    id: "managers",
    title: "For managers",
    icon: UserCheck,
    items: [
      "Review and prioritize the issue queue",
      "Assign workers and set deadlines",
      "Monitor all open jobs in one view",
      "Generate and send maintenance invoices",
      "View community dashboard and stats",
    ],
  },
  {
    id: "workers",
    title: "For workers",
    icon: Activity,
    items: [
      "See only the jobs assigned to you",
      "Log notes and upload photo proof",
      "Chat with the resident on the job",
      "Mark jobs done when complete",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-24">
        <Reveal>
          <p className="text-sm font-semibold text-primary">How it works</p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            From first report to final confirmation
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            FixFlow runs a single clear workflow that every role can follow
            without training.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, title, description, icon: Icon, id }) => (
              <div
                key={step}
                id={id}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-heading text-3xl font-semibold text-primary/30">
                    {step}
                  </span>
                  <Icon className="size-5 text-primary" />
                </div>
                <h2 className="font-heading text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map(({ title, items, icon: Icon, id }) => (
              <div
                key={title}
                id={id}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="font-heading text-lg font-semibold">{title}</h2>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-muted/40 px-8 py-10">
            <div className="flex items-center gap-3">
              <CreditCard className="size-6 text-primary" />
              <h2 className="font-heading text-2xl font-semibold">
                Maintenance fee payments
              </h2>
            </div>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Managers generate invoices for their community each month.
              Residents receive them in the app and pay with a single click
              through Stripe's secure hosted checkout. No card details stored,
              no manual follow-up.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <MessageCircle className="size-6 text-primary" />
            <h2 className="font-heading text-2xl font-semibold">
              Built-in chat
            </h2>
          </div>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Every issue has its own chat thread, visible only to the resident
            who reported it and the worker assigned to it. No external apps
            needed.
          </p>
          <Link href="/register" className={buttonVariants({ className: "mt-6" })}>
            Get started
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
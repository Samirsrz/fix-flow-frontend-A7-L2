import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/features/home/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the FixFlow team.",
};

const channels = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@fixflow.app",
    note: "We reply within one business day.",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Dhaka, Bangladesh",
    note: "Built for communities here.",
  },
  {
    icon: MessageCircle,
    title: "In-app support",
    detail: "Use the contact form in your dashboard",
    note: "Fastest route for account issues.",
  },
];

export default function ContactPage() {
  return (
    <div className="px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-semibold text-primary">Contact</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Have a question, a problem or a suggestion? Reach out through any
            of the channels below.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {channels.map(({ icon: Icon, title, detail, note }) => (
              <div
                key={title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="font-heading text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm font-medium">{detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <div className="rounded-3xl bg-muted/40 px-8 py-10">
            <h2 className="font-heading text-2xl font-semibold">
              For community admins
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              If you manage a residential building or compound and want to bring
              FixFlow to your community, email us and we will help you get set
              up — including creating your first admin account.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
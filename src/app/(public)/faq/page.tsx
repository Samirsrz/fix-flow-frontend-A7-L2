import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/features/home/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about FixFlow.",
};

const groups = [
  {
    title: "Accounts",
    items: [
      {
        q: "Who can create an account?",
        a: "Residents can self-register with an email and OTP verification, or with Google. Manager, worker and admin accounts are created by an existing admin.",
      },
      {
        q: "Can I log in with Google?",
        a: "Yes. After a Google login you will be asked to pick your community once, and then you are fully set up.",
      },
      {
        q: "What happens if my account is banned?",
        a: "You will not be able to log in. Contact your community admin or reach out through the contact page.",
      },
    ],
  },
  {
    title: "Issues",
    items: [
      {
        q: "Can I attach photos to a report?",
        a: "Yes, up to five photos per issue.",
      },
      {
        q: "How do I track my issue after submitting?",
        a: "Open the issue from your dashboard. You can see every status change and all worker updates in one place.",
      },
      {
        q: "What if the repair is not done properly?",
        a: "Dispute it. The issue reopens and the manager assigns a new attempt. You can add a comment explaining what is wrong.",
      },
      {
        q: "Can I chat with the worker?",
        a: "Yes. Every issue has a built-in chat thread between the resident and the assigned worker.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        q: "How do I pay my maintenance fee?",
        a: "Each invoice in your dashboard has a Pay button. It opens Stripe's secure hosted checkout. You are redirected back once the payment is complete.",
      },
      {
        q: "Is my card information stored?",
        a: "No. Payments go through Stripe directly. FixFlow never sees or stores your card details.",
      },
      {
        q: "What if my invoice shows overdue?",
        a: "Pay it as normal through the Pay button. Contact your manager if you believe there is an error.",
      },
    ],
  },
  {
    title: "For managers and workers",
    items: [
      {
        q: "How do I get a manager or worker account?",
        a: "A platform admin creates the account and emails you the credentials. You can change your password afterwards.",
      },
      {
        q: "Can a manager see issues from other communities?",
        a: "No. Each manager is scoped to exactly one community and can only see issues within it.",
      },
      {
        q: "Can a worker be assigned to multiple communities?",
        a: "Yes. Workers are platform-wide and can be assigned to issues in any community.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold text-primary">FAQ</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-6 leading-7 text-muted-foreground">
            Everything you need to know about using FixFlow.
          </p>
        </Reveal>

        <div className="mt-16 space-y-12">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <h2 className="mb-4 font-heading text-xl font-semibold">
                {group.title}
              </h2>
              <Accordion className="w-full">
                {group.items.map(({ q, a }, index) => (
                  <AccordionItem value={`${gi}-${index}`} key={q}>
                    <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                    <AccordionContent className="leading-7 text-muted-foreground">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
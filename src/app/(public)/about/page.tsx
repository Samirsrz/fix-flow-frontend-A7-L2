import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/features/home/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what FixFlow is, why it was built, and how it helps communities in Bangladesh resolve maintenance issues transparently.",
};

const values = [
  {
    title: "Transparency",
    description:
      "Every status change is visible to the people it affects. No black boxes.",
  },
  {
    title: "Accountability",
    description:
      "Photo proof, ratings and an audit trail mean nobody can claim work was done when it wasn't.",
  },
  {
    title: "Simplicity",
    description:
      "One workflow for residents, managers and workers — no training required.",
  },
  {
    title: "Community first",
    description:
      "Built specifically for managed communities in Bangladesh, not adapted from somewhere else.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-semibold text-primary">About FixFlow</p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Maintenance that people can actually trust
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            FixFlow is a community maintenance platform built for managed
            residential buildings and compounds in Bangladesh. It connects
            residents, property managers and maintenance workers on one clear
            workflow — from the moment a problem is spotted to the moment it is
            confirmed fixed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="font-heading text-2xl font-semibold">Why we built it</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            In most managed communities, maintenance requests disappear into
            phone calls and WhatsApp threads. Residents have no idea what is
            happening. Workers show up without context. Managers juggle
            everything manually. FixFlow replaces that chaos with a single
            structured process where every person knows exactly what they need
            to do next.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <h2 className="font-heading text-2xl font-semibold">Our values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <div className="rounded-3xl bg-muted/40 px-8 py-10">
            <h2 className="font-heading text-2xl font-semibold">
              Ready to try it?
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Residents can create an account in under a minute. Manager and
              worker accounts are set up by your community admin.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className={buttonVariants()}>
                Create an account
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "outline" })}
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks";
import { ROLE_HOME } from "@/lib/constants/auth";

type Cta = { label: string; href: string };
type CtaSectionProps = { primaryCta?: Cta; secondaryCta?: Cta };

export function CtaSection({
  primaryCta = { label: "Create an account", href: "/register" },
  secondaryCta = { label: "Log in", href: "/login" },
}: CtaSectionProps) {
  const { data: session } = useSession();

  const primary = session
    ? { label: "Go to dashboard", href: ROLE_HOME[session.role] }
    : primaryCta;

  const secondary = session ? null : secondaryCta;

  return (
    <section className="px-5 pb-20 sm:px-8 lg:px-10">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/4 size-72 rounded-full bg-primary-foreground/8 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to fix things faster?
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/75">
            Give your community one clear place to report, resolve and confirm
            every issue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary",
              })}
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                })}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
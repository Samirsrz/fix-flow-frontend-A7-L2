"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/features/auth/hooks";
import { ROLE_HOME } from "@/lib/constants/auth";

export type Cta = { label: string; href: string };

type HeroCtasProps = { primaryCta: Cta; secondaryCta: Cta };

export function HeroCtas({ primaryCta, secondaryCta }: HeroCtasProps) {
  const { data: session } = useSession();

  const primary = session
    ? { label: "Go to dashboard", href: ROLE_HOME[session.role] }
    : primaryCta;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={primary.href}
        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5"
      >
        {primary.label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
      <Link
        href={secondaryCta.href}
        className="inline-flex items-center rounded-xl border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
      >
        {secondaryCta.label}
      </Link>
    </div>
  );
}
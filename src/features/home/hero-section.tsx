import { CreditCard, ImageIcon, Radio } from "lucide-react";
import { type Cta, HeroCtas } from "./hero-ctas";
import { HeroShowcase } from "./hero-showcase";

type HeroSectionProps = { primaryCta?: Cta; secondaryCta?: Cta };

const gridBackground =
  "[background-image:radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_32%),radial-gradient(circle_at_80%_10%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_28%),linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] [background-size:auto,auto,48px_48px,48px_48px]";

export function HeroSection({
  primaryCta = { label: "Get started", href: "/register" },
  secondaryCta = { label: "See how it works", href: "/services#how-it-works" },
}: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-70 ${gridBackground}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/3 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-28 sm:px-8 lg:min-h-svh lg:grid-cols-[.9fr_1.1fr] lg:gap-10 lg:px-10 lg:pb-10 lg:pt-24">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            Transparent community maintenance
          </div>

          <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Fix community{" "}
            <span className="relative whitespace-nowrap text-primary">
              <span className="relative z-10">problems</span>
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 h-2 w-full rounded-full bg-primary/15"
              />
            </span>
            , faster.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Report an issue, watch it get assigned, and confirm the fix.
            FixFlow keeps residents, managers and workers on the same page,
            from the first photo to the final rating.
          </p>

          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} />

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ImageIcon className="size-4 text-primary" />
              Photo-proof repairs
            </span>
            <span className="inline-flex items-center gap-2">
              <Radio className="size-4 text-primary" />
              Live status tracking
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              Secure online payments
            </span>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
import { Wrench } from "lucide-react";
import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="FixFlow home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Wrench aria-hidden="true" />
      </span>
      <span className="font-heading text-xl font-semibold tracking-tight">
        FixFlow
      </span>
    </Link>
  );
}

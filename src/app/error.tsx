"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="size-10 text-destructive" />
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
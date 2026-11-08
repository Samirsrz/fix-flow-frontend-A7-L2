"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function PublicError({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <h2 className="font-heading text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 max-w-sm text-muted-foreground">
        An error occurred. Please try again or go back to the home page.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" render={<Link href="/" />}>
          Go home
        </Button>
      </div>
    </div>
  );
}
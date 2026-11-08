"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <h2 className="font-heading text-2xl font-bold tracking-tight">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-sm text-muted-foreground">
        An error occurred while loading this page.
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft data-icon="inline-start" />
          Go back
        </Button>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
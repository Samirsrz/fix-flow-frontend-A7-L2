"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top <ArrowUp data-icon="inline-end" />
    </Button>
  );
}

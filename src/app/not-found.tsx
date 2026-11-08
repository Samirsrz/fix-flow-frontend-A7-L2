import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="size-10 text-muted-foreground" />
      </div>
      <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
        404
      </h1>
      <p className="mt-3 text-xl font-semibold">Page not found</p>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />}>
          <Home data-icon="inline-start" />
          Go home
        </Button>
        <Button variant="outline" render={<Link href="/login" />}>
          Log in
        </Button>
      </div>
    </main>
  );
}
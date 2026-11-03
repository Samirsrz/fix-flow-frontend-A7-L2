"use client";

import { LogOut, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { PublicUser } from "./user-menu";

type MobileNavProps = {
  links: { label: string; href: string }[];
  user: PublicUser | null;
  dashboardHref: string;
  profileHref: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
};

export function MobileNav({
  links,
  user,
  dashboardHref,
  profileHref,
  onLogout,
  isLoggingOut,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation" />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,20rem)] max-w-sm">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">FixFlow</SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col gap-1 px-4"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={dashboardHref}
                    className={buttonVariants({
                      variant: "outline",
                      className: "justify-start",
                    })}
                  />
                }
              >
                <UserRound data-icon="inline-start" />
                Dashboard
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={profileHref}
                    className={buttonVariants({
                      variant: "outline",
                      className: "justify-start",
                    })}
                  />
                }
              >
                <UserRound data-icon="inline-start" />
                Profile
              </SheetClose>
              <Button
                variant="ghost"
                className="justify-start text-destructive"
                disabled={isLoggingOut}
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
              >
                <LogOut data-icon="inline-start" />
                {isLoggingOut ? "Logging out…" : "Log out"}
              </Button>
            </>
          ) : (
            <>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  />
                }
              >
                Log in
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/register"
                    className={buttonVariants({ className: "w-full" })}
                  />
                }
              >
                Get started
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

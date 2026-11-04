"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/layout/brand";
import { MobileNav } from "@/components/layout/mobile-nav";
import { type PublicUser, UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PublicNavbarProps = {
  user: PublicUser | null;
  isLoading?: boolean;
  dashboardHref?: string;
  profileHref?: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
};

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function PublicNavbar({
  user,
  isLoading = false,
  dashboardHref = "/dashboard",
  profileHref = "/profile",
  onLogout,
  isLoggingOut = false,
}: PublicNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 -mb-16 h-16 px-3 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-6 transition-all duration-300",
          scrolled
            ? "mt-2 h-14 max-w-5xl rounded-2xl border border-border/60 bg-background/70 px-4 shadow-lg shadow-primary/5 backdrop-blur-xl"
            : "h-16 max-w-7xl px-1 sm:px-4 lg:px-6",
        )}
      >
        <Brand />

        <nav
          className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/50 p-1 backdrop-blur md:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <NavLink key={link.href} {...link} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoading ? (
            <div
              className="h-9 w-44 animate-pulse rounded-md bg-muted"
              aria-hidden="true"
            />
          ) : user ? (
            <UserMenu
              user={user}
              dashboardHref={dashboardHref}
              profileHref={profileHref}
              onLogout={onLogout}
              isLoggingOut={isLoggingOut}
            />
          ) : (
            <AuthActions />
          )}
        </div>

        <div className="md:hidden">
          <MobileNav
            links={links}
            user={user}
            dashboardHref={dashboardHref}
            profileHref={profileHref}
            onLogout={onLogout}
            isLoggingOut={isLoggingOut}
          />
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({
  label,
  href,
  pathname,
}: {
  label: string;
  href: string;
  pathname: string;
}) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-sm transition-colors hover:text-foreground",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="active-nav"
          className="absolute inset-0 rounded-full bg-primary/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function AuthActions() {
  return (
    <>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/login" />}
      >
        Log in
      </Button>
      <Button
        className="group rounded-full"
        nativeButton={false}
        render={<Link href="/register" />}
      >
        Get started
        <ArrowRight
          className="transition-transform group-hover:translate-x-0.5"
          data-icon="inline-end"
        />
      </Button>
    </>
  );
}
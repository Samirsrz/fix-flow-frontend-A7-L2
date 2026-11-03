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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-sm backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {links.map((link, index) => (
            <NavLink
              key={link.href}
              {...link}
              index={index}
              pathname={pathname}
            />
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
  index,
  pathname,
}: {
  label: string;
  href: string;
  index: number;
  pathname: string;
}) {
  const active = pathname === href;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      <Link
        href={href}
        className={cn(
          "relative block rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {active && (
          <motion.span
            layoutId="active-nav"
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
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
        className="group"
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

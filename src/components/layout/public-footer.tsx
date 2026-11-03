import Link from "next/link";
import { BackToTop } from "@/components/layout/back-to-top";
import { Brand } from "@/components/layout/brand";

const groups = [
  {
    title: "Platform",
    links: [
      { label: "Services", href: "/services" },
      { label: "How it works", href: "/services#how-it-works" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Create an account", href: "/register" },
      { label: "Log in", href: "/login" },
      { label: "For residents", href: "/services#residents" },
      { label: "For managers", href: "/services#managers" },
      { label: "For workers", href: "/services#workers" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Brand />
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            FixFlow helps residents, managers and maintenance workers resolve
            community issues transparently, from first report to final
            confirmation.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for communities in Bangladesh.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-sm font-semibold">{group.title}</h2>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex text-sm text-muted-foreground transition-all hover:translate-x-0.5 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-border px-4 py-5 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} FixFlow. All rights reserved.</p>
        <BackToTop />
      </div>
    </footer>
  );
}

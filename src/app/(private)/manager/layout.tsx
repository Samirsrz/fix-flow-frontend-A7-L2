"use client";

import { useLogout, useSession } from "@/features/auth/hooks";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { managerNav } from "@/features/dashboard/dashboard-nav";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (!session) return null;

  return (
    <DashboardShell
      navItems={managerNav}
      user={{ name: session.name, email: session.email, role: "Manager" }}
      onLogout={() => logout()}
      isLoggingOut={isLoggingOut}
    >
      {children}
    </DashboardShell>
  );
}
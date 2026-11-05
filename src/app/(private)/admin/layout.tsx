"use client";

import { useLogout, useSession } from "@/features/auth/hooks";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { adminNav } from "@/features/dashboard/dashboard-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (!session) return null;

  return (
    <DashboardShell
      navItems={adminNav}
      user={{ name: session.name, email: session.email, role: "Admin" }}
      onLogout={() => logout()}
      isLoggingOut={isLoggingOut}
    >
      {children}
    </DashboardShell>
  );
}
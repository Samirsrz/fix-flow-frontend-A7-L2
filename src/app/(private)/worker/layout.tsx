"use client";

import { useLogout, useSession } from "@/features/auth/hooks";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { workerNav } from "@/features/dashboard/dashboard-nav";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (!session) return null;

  return (
    <DashboardShell
      navItems={workerNav}
      user={{ name: session.name, email: session.email, role: "Worker" }}
      onLogout={() => logout()}
      isLoggingOut={isLoggingOut}
    >
      {children}
    </DashboardShell>
  );
}
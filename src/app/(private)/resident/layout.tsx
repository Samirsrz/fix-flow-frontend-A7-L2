"use client";

import { useLogout, useSession } from "@/features/auth/hooks";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { residentNav } from "@/features/dashboard/dashboard-nav";
import { ProfileGuard } from "@/features/auth/profile-guard";

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (!session) return null;

  return (
    <DashboardShell
      navItems={residentNav}
      user={{ name: session.name, email: session.email, role: "Resident" }}
      onLogout={() => logout()}
      isLoggingOut={isLoggingOut}
    >
      <ProfileGuard>{children}</ProfileGuard>
    </DashboardShell>
  );
}
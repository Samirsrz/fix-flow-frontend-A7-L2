"use client";

import { PublicNavbar } from "@/components/layout/public-navbar";
import { useLogout, useSession } from "@/features/auth/hooks";
import { ROLE_HOME } from "@/lib/constants/auth";

export function SiteHeader() {
  const { data: session, isPending } = useSession();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const home = session ? ROLE_HOME[session.role] : undefined;

  return (
    <PublicNavbar
      user={
        session
          ? { name: session.name, email: session.email, role: session.role }
          : null
      }
      isLoading={isPending}
      dashboardHref={home}
      profileHref={home ? `${home}/profile` : undefined}
      onLogout={() => logout()}
      isLoggingOut={isLoggingOut}
    />
  );
}

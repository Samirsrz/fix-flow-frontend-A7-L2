"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/features/profile/hooks";

export function ProfileGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && user && user.role === "RESIDENT" && !user.resident) {
      router.replace("/complete-profile");
    }
  }, [user, isPending, router]);

  if (isPending) return null;

  if (user?.role === "RESIDENT" && !user.resident) return null;

  return <>{children}</>;
}
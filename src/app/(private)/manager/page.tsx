"use client";

import { ManagerStatsCards } from "@/features/manager/manager-stats-cards";
import { useManagerStats } from "@/features/manager/hooks";

const emptyStats = {
  issuesByStatus: {},
  residentCount: 0,
  totalRevenue: 0,
  avgResolutionTimeHours: 0,
};

export default function ManagerDashboardPage() {
  const { data: stats, isPending } = useManagerStats();

  return (
    <div className="space-y-6 p-2">
      <div>
        <p className="text-sm font-medium text-primary">Overview</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your community at a glance.
        </p>
      </div>
      <ManagerStatsCards stats={stats ?? emptyStats} isLoading={isPending} />
    </div>
  );
}
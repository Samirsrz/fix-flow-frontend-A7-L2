"use client";

import { AdminStatsCards } from "@/features/admin/admin-stats-cards";
import { useAdminStats } from "@/features/admin/hooks";

const emptyStats = {
  issuesByStatus: {},
  usersByRole: {},
  totalRevenue: 0,
  avgResolutionTimeHours: 0,
};

export default function AdminDashboardPage() {
  const { data: stats, isPending } = useAdminStats();

  return (
    <div className="space-y-6 p-2">
      <div>
        <p className="text-sm font-medium text-primary">Platform overview</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything happening across all communities.
        </p>
      </div>
      <AdminStatsCards
        stats={stats ?? emptyStats}
        isLoading={isPending}
      />
    </div>
  );
}
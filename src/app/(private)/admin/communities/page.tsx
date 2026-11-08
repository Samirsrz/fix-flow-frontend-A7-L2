"use client";

import { AdminCommunitiesView } from "@/features/admin/admin-communities-view";
import { useAdminCommunities, useCreateCommunity } from "@/features/admin/hooks";

export default function AdminCommunitiesPage() {
  const { data: communities = [], isPending } = useAdminCommunities();
  const { mutateAsync: createCommunity, isPending: isCreating } =
    useCreateCommunity();

  return (
    <AdminCommunitiesView
      communities={communities}
      isLoading={isPending}
      onCreate={async (data) => { await createCommunity(data); }}
      isCreating={isCreating}
    />
  );
}
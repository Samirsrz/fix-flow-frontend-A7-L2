"use client";

import { AdminUsersView } from "@/features/admin/admin-users-view";
import {
  useAdminUsers,
  useBanUser,
  useUnbanUser,
  useDeleteUser,
  useCreateUser,
  useAdminCommunities,
} from "@/features/admin/hooks";

export default function AdminUsersPage() {
  const { data: usersData, isPending } = useAdminUsers();
  const { data: communities = [] } = useAdminCommunities();
  const { mutateAsync: banUser } = useBanUser();
  const { mutateAsync: unbanUser } = useUnbanUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();

  return (
    <AdminUsersView
      users={usersData?.data ?? []}
      isLoading={isPending}
      onBan={async (id) => { await banUser(id); }}
      onUnban={async (id) => { await unbanUser(id); }}
      onDelete={async (id) => { await deleteUser(id); }}
      onCreate={async (data) => { await createUser(data); }}
      isCreating={isCreating}
      communities={communities.map((c) => ({
        id: c.id,
        name: c.name,
        city: c.city,
      }))}
    />
  );
}
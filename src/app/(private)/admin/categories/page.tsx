"use client";

import { AdminCategoriesView } from "@/features/admin/admin-categories-view";
import { useAdminCategories, useCreateCategory } from "@/features/admin/hooks";

export default function AdminCategoriesPage() {
  const { data: categories = [], isPending } = useAdminCategories();
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();

  return (
    <AdminCategoriesView
      categories={categories}
      isLoading={isPending}
      onCreate={async (data) => { await createCategory(data); }}
      isCreating={isCreating}
    />
  );
}
"use client";

import CompleteProfileForm, {
  type CompleteProfileValues,
} from "@/features/auth/forms/complete-profile-form";
import { useCompleteProfile, usePublicCommunities } from "@/features/auth/hooks";

export default function CompleteProfilePage() {
  const { data: communities = [] } = usePublicCommunities();
  const { mutateAsync, isPending } = useCompleteProfile();

  const handleSubmit = async (values: CompleteProfileValues) => {
    await mutateAsync(values);
  };

  return (
    <CompleteProfileForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      communities={communities}
    />
  );
}
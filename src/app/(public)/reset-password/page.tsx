"use client";

import { useSearchParams } from "next/navigation";
import ResetPasswordForm, {
  type ResetPasswordValues,
} from "@/features/auth/forms/reset-password-form";
import { useResetPassword } from "@/features/auth/hooks";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { mutateAsync, isPending } = useResetPassword();

  const handleSubmit = async (values: ResetPasswordValues) => {
    await mutateAsync(values);
  };

  return (
    <ResetPasswordForm
      email={email}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
}
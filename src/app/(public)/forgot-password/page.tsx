"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm, {
  type ForgotPasswordValues,
} from "@/features/auth/forms/forgot-password-form";
import { useForgotPassword } from "@/features/auth/hooks";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutateAsync, isPending } = useForgotPassword();

  const handleSubmit = async (values: ForgotPasswordValues) => {
    await mutateAsync(values, {
      onSuccess: () => {
        setEmail(values.email);
        router.push(
          `/reset-password?email=${encodeURIComponent(values.email)}`,
        );
      },
    });
  };

  return <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isPending} />;
}
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import LoginForm, { type LoginValues } from "@/features/auth/forms/login-form";
import { useLogin, useGoogleLogin } from "@/features/auth/hooks";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const { mutateAsync: loginMutate, isPending: isLoading } = useLogin();
  const { mutateAsync: googleLoginMutate, isPending: isGoogleLoading } =
    useGoogleLogin();

  const handleSubmit = async (values: LoginValues) => {
    await loginMutate(values, {
      onSuccess: (data) => {
        const dest = next ?? `/resident`;
        router.push(dest);
      },
    });
  };

  const handleGoogleLogin = async () => {
    toast.info("Google login coming soon");
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
    />
  );
}
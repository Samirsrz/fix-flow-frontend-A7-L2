"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import LoginForm, { type LoginValues } from "@/features/auth/forms/login-form";
import { useLogin, useGoogleLogin } from "@/features/auth/hooks";
import { ROLE_HOME } from "@/lib/constants/auth";
import { toast } from "sonner";

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
        const dest = next ?? ROLE_HOME[data.user.role];
        router.push(dest);
      },
    });
  };

  return (
    // biome-ignore lint/complexity/noUselessFragments: <explanation>
    <>
      <LoginForm
        onSubmit={handleSubmit}
        onGoogleLogin={() => {}}
        isLoading={isLoading}
        isGoogleLoading={isGoogleLoading}
        googleButton={
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (!credentialResponse.credential) {
                toast.error("Google login failed. Please try again.");
                return;
              }
              await googleLoginMutate({
                idToken: credentialResponse.credential,
              });
            }}
            onError={() => {
              toast.error("Google login failed. Please try again.");
            }}
            useOneTap
            theme="outline"
            size="large"
            width="100%"
          />
        }
      />
    </>
  );
}
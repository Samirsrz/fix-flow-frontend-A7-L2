"use client";

import { useState } from "react";
import RegisterForm, {
  type RegisterValues,
} from "@/features/auth/forms/register-form";
import OtpForm from "@/features/auth/forms/otp-form";
import {
  useRegister,
  useVerifyOtp,
  useResendOtp,
  usePublicCommunities,
} from "@/features/auth/hooks";

export default function RegisterPage() {
  const [step, setStep] = useState<"register" | "otp">("register");
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const { data: communities = [] } = usePublicCommunities();
  const { mutateAsync: registerMutate, isPending: isRegistering } =
    useRegister();
  const { mutateAsync: verifyMutate, isPending: isVerifying } = useVerifyOtp();
  const { mutateAsync: resendMutate } = useResendOtp();

  const startCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = async (values: RegisterValues) => {
    await registerMutate(values, {
      onSuccess: () => {
        setEmail(values.email);
        setStep("otp");
        startCooldown();
      },
    });
  };

  const handleVerifyOtp = async (otp: string) => {
    await verifyMutate({ email, otp });
  };

  const handleResend = async () => {
    await resendMutate(email, {
      onSuccess: () => startCooldown(),
    });
  };

  if (step === "otp") {
    return (
      <OtpForm
        email={email}
        onSubmit={handleVerifyOtp}
        isLoading={isVerifying}
        onResend={handleResend}
        resendCooldown={resendCooldown}
      />
    );
  }

  return (
    <RegisterForm
      onSubmit={handleRegister}
      isLoading={isRegistering}
      communities={communities}
    />
  );
}
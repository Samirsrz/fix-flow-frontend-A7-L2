"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getSession,
  logout,
  registerResident,
  verifyOtp,
  resendOtp,
  login,
  forgotPassword,
  resetPassword,
  completeProfile,
  googleLogin,
  getPublicCommunities,
  type RegisterPayload,
  type VerifyOtpPayload,
  type LoginPayload,
  type ResetPasswordPayload,
  type CompleteProfilePayload,
  type GoogleLoginPayload,
} from "./api";
import { authKeys } from "./keys";
import { ROLE_HOME } from "@/lib/constants/auth";

export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicCommunities() {
  return useQuery({
    queryKey: ["communities", "public"],
    queryFn: getPublicCommunities,
    staleTime: 10 * 60 * 1000,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
      router.refresh();
      toast.success("Logged out");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerResident(payload),
    onError: (error) => toast.error(error.message),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      toast.success("Email verified successfully");
      router.push(ROLE_HOME[data.user.role]);
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (email: string) => resendOtp({ email }),
    onSuccess: () => toast.success("OTP resent to your email"),
    onError: (error) => toast.error(error.message),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      toast.success("Logged in successfully");
      router.push(ROLE_HOME[data.user.role]);
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => toast.success("OTP sent to your email"),
    onError: (error) => toast.error(error.message),
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/login");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useCompleteProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CompleteProfilePayload) => completeProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      toast.success("Profile completed");
      router.push(ROLE_HOME["RESIDENT"]);
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useGoogleLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => googleLogin(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      if (data.needsProfileCompletion) {
        router.push("/complete-profile");
      } else {
        router.push(ROLE_HOME["RESIDENT"]);
      }
    },
    onError: (error) => toast.error(error.message),
  });
}
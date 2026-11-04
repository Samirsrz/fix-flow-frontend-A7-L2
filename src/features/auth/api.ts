import { ofetch } from "ofetch";
import { api } from "@/lib/api/client";
import type { SessionUser } from "@/lib/auth/session";

export type Community = { id: string; name: string; city: string };

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  communityId: string;
  unitNumber?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface CompleteProfilePayload {
  communityId: string;
  unitNumber?: string;
}

export interface GoogleLoginPayload {
  idToken: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const res = await ofetch<{ user: SessionUser | null }>("/api/session", {
    retry: 0,
  });
  return res.user;
}

export function logout() {
  return api<null>("/auth/logout", { method: "POST" });
}

export function registerResident(payload: RegisterPayload) {
  return api<null>("/auth/register", { method: "POST", body: payload });
}

export function verifyOtp(payload: VerifyOtpPayload) {
  return api<{ user: SessionUser }>("/auth/verify-otp", {
    method: "POST",
    body: payload,
  });
}

export function resendOtp(payload: { email: string }) {
  return api<null>("/auth/resend-otp", { method: "POST", body: payload });
}

export function login(payload: LoginPayload) {
  return api<{ user: SessionUser }>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return api<null>("/auth/forgot-password", { method: "POST", body: payload });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return api<null>("/auth/reset-password", { method: "POST", body: payload });
}

export function completeProfile(payload: CompleteProfilePayload) {
  return api<null>("/auth/complete-profile", { method: "POST", body: payload });
}

export function googleLogin(payload: GoogleLoginPayload) {
  return api<{ needsProfileCompletion: boolean }>("/auth/google-login", {
    method: "POST",
    body: payload,
  });
}

export function getPublicCommunities() {
  return api<Community[]>("/community/public", { method: "GET" });
}
"use client";

import { useSearchParams } from "next/navigation";
import { PaymentSuccessPage } from "@/features/payments/payment-success-page";

export default function PaymentSuccessRoute() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? undefined;

  return <PaymentSuccessPage sessionId={sessionId} />;
}
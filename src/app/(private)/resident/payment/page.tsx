"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { InvoiceListView } from "@/features/payments/invoice-list-view";
import { useInvoices, useInitiatePayment, paymentKeys } from "@/features/payments/hooks";

export default function ResidentPaymentsPage() {
  const [payingId, setPayingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: invoicesData, isPending } = useInvoices();
  const { mutateAsync: initiatePayment } = useInitiatePayment();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: paymentKeys.invoices });
  }, [queryClient]);

  const handlePay = async (invoiceId: string) => {
    setPayingId(invoiceId);
    try {
      await initiatePayment(invoiceId);
    } finally {
      setPayingId(null);
    }
  };

  return (
    <InvoiceListView
      invoices={invoicesData?.data ?? []}
      isLoading={isPending}
      onPay={handlePay}
      isPaying={payingId}
    />
  );
}
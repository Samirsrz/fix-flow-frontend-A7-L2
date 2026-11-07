import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getInvoices, initiatePayment } from "./api";

export const paymentKeys = {
  invoices: ["payments", "invoices"] as const,
};

export function useInvoices() {
  return useQuery({
    queryKey: paymentKeys.invoices,
    queryFn: getInvoices,
    staleTime: 0,
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (invoiceId: string) => initiatePayment(invoiceId),
    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },
    onError: (error) => toast.error(error.message),
  });
}
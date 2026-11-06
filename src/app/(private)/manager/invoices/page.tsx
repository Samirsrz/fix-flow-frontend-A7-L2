"use client";

import { ManagerInvoicesView } from "@/features/manager/manager-invoices-view";
import {
  useManagerInvoices,
  useManagerResidents,
  useGenerateInvoice,
} from "@/features/manager/hooks";
import type { GenerateInvoiceData } from "@/features/manager/manager-invoices-view";

export default function ManagerInvoicesPage() {
  const { data: invoicesData, isPending: isLoadingInvoices } =
    useManagerInvoices();
  const { data: residents = [] } = useManagerResidents();
  const { mutateAsync: generateInvoice, isPending: isGenerating } =
    useGenerateInvoice();

  const handleGenerate = async (data: GenerateInvoiceData) => {
    await generateInvoice({
      period: data.period,
      dueDate: new Date(data.dueDate).toISOString(),
      amount: data.amount,
      residentId: data.residentId,
    });
  };

  return (
    <ManagerInvoicesView
      invoices={invoicesData?.data ?? []}
      residents={residents}
      isLoading={isLoadingInvoices}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
    />
  );
}
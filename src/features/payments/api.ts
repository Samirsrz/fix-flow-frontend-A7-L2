import { api } from "@/lib/api/client";
import type { Invoice } from "./invoice-types";
import type { PaginationMeta } from "@/shared/types/api";

interface RawInvoice {
  id: string;
  period: string;
  amount: string;
  dueDate: string;
  status: Invoice["status"];
  community?: { name: string };
  payments: { id: string; status: string; paidAt?: string }[];
}

function mapInvoice(raw: RawInvoice): Invoice {
  const dueDate = new Date(raw.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const period = (() => {
    const [year, month] = raw.period.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      { month: "long", year: "numeric" },
    );
  })();

  return {
    id: raw.id,
    period,
    amount: raw.amount,
    dueDate,
    status: raw.status,
    communityName: raw.community?.name ?? "Community",
    payments: raw.payments,
  };
}

export function getInvoices() {
  return api<{ data: RawInvoice[]; meta: PaginationMeta }>(
    "/invoice?limit=100",
    { method: "GET" },
  ).then((res) => ({
    data: res.data.map(mapInvoice),
    meta: res.meta,
  }));
}

export function initiatePayment(invoiceId: string) {
  return api<{ checkoutUrl: string }>("/payment/initiate", {
    method: "POST",
    body: { invoiceId },
  });
}
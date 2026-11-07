export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE";

export type Invoice = {
  id: string;
  period: string;
  amount: string;
  dueDate: string;
  status: InvoiceStatus;
  communityName: string;
  payments: { id: string; status: string; paidAt?: string }[];
};
import { api } from "@/lib/api/client";
import type { Category } from "./issue-types";

export function getCategories() {
  return api<Category[]>("/categories", { method: "GET" });
}
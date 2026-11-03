import { Role } from "@/shared/types/api";

export const ACCESS_COOKIE = "fixflow_access_token";

export const ROLE_HOME: Record<Role, string> = {
  RESIDENT: "/resident",
  MANAGER: "/manager",
  WORKER: "/worker",
  ADMIN: "/admin",
};

export const ROLE_LABEL: Record<Role, string> = {
  RESIDENT: "Resident",
  MANAGER: "Manager",
  WORKER: "Worker",
  ADMIN: "Admin",
};

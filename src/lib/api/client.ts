import { ApiResponse } from "@/shared/types/api";
import { FetchError, type FetchOptions, ofetch } from "ofetch";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const raw = ofetch.create({
  baseURL: "/api/v1",
  credentials: "include",
  retry: 0,
});

function toApiError(error: unknown): ApiError {
  if (error instanceof FetchError && error.status) {
    const body = error.data as { message?: string } | undefined;
    return new ApiError(
      error.status,
      body?.message ?? "Something went wrong. Please try again.",
    );
  }
  return new ApiError(0, "Network error. Please check your connection.");
}

async function request<T>(
  path: string,
  options: FetchOptions<"json">,
): Promise<T> {
  try {
    const res = await raw<ApiResponse<T>>(path, options);
    return res.data;
  } catch (error) {
    throw toApiError(error);
  }
}

let refreshing: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  refreshing ??= raw("/auth/refresh-token", { method: "POST" })
    .then(() => undefined)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

async function endSession() {
  await raw("/auth/logout", { method: "POST" }).catch(() => undefined);
  if (typeof window !== "undefined") window.location.assign("/login");
}

const NO_REFRESH_PATHS = [
  "/auth/login",
  "/auth/refresh-token",
  "/auth/logout",
  "/auth/google-login",
];

export async function api<T>(
  path: string,
  options: FetchOptions<"json"> = {},
): Promise<T> {
  try {
    return await request<T>(path, options);
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.statusCode === 401 &&
      !NO_REFRESH_PATHS.includes(path)
    ) {
      try {
        await refreshSession();
      } catch {
        await endSession();
        throw error;
      }
      return request<T>(path, options);
    }
    throw error;
  }
}

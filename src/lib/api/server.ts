import "server-only";
import { FetchError, type FetchOptions, ofetch } from "ofetch";
import { cookies } from "next/headers";

import { ApiError } from "./client";
import { ApiResponse } from "@/shared/types/api";

export async function serverApi<T>(
  path: string,
  options: FetchOptions<"json"> = {},
): Promise<T> {
  const cookieStore = await cookies();
  try {
    const res = await ofetch<ApiResponse<T>>(path, {
      baseURL: process.env.API_URL,
      headers: { cookie: cookieStore.toString() },
      retry: 0,
      ...options,
    });
    return res.data;
  } catch (error) {
    if (error instanceof FetchError && error.status) {
      const body = error.data as { message?: string } | undefined;
      throw new ApiError(
        error.status,
        body?.message ?? "Something went wrong.",
      );
    }
    throw new ApiError(0, "Could not reach the server.");
  }
}

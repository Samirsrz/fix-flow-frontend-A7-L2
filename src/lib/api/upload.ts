import { ApiResponse } from "@/shared/types/api";
import { ApiError } from "./client";

export function uploadWithProgress<T>(
  path: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
  method: "POST" | "PATCH" = "POST",
): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `/api/v1${path}`);
    xhr.withCredentials = true;

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable)
        onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      let body: Partial<ApiResponse<T>> | null = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        body = null;
      }
      if (xhr.status >= 200 && xhr.status < 300 && body)
        resolve(body.data as T);
      else
        reject(
          new ApiError(
            xhr.status,
            body?.message ?? "Upload failed. Please try again.",
          ),
        );
    };

    xhr.onerror = () =>
      reject(new ApiError(0, "Network error. Please check your connection."));
    xhr.send(formData);
  });
}

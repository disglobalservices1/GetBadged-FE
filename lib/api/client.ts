import type { ApiError, ApiSuccess } from "@/types/api";

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export async function apiClient<T>(request: Promise<T>): Promise<ApiResult<T>> {
  try {
    const data = await request;
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: "Something went wrong. Please try again."
      }
    };
  }
}

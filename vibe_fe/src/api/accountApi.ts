import { AxiosError } from "axios";
import { apiClient } from "./client";
import type { ApiErrorResponse, ApiResponse } from "../types/api";
import type { AccountManagement, UpdatePrimaryBlogRequest } from "../types/account";

function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.data?.message ?? fallback;
  }

  return fallback;
}

export async function getAccountManagement() {
  try {
    const response = await apiClient.get<ApiResponse<AccountManagement>>("/api/users/me/account");
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "계정관리 정보를 불러오지 못했습니다."));
  }
}

export async function updatePrimaryBlog(payload: UpdatePrimaryBlogRequest) {
  try {
    const response = await apiClient.patch<ApiResponse<AccountManagement>>("/api/users/me/account/primary-blog", payload);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "대표 블로그를 변경하지 못했습니다."));
  }
}

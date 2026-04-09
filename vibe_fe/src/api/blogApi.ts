import { AxiosError } from "axios";
import { apiClient } from "./client";
import type { ApiErrorResponse, ApiResponse } from "../types/api";
import type { BlogProfile, SubscriptionActionResponse } from "../types/blog";

function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.data?.message ?? fallback;
  }

  return fallback;
}

export async function getBlogProfile(blogUsername: string) {
  try {
    const response = await apiClient.get<ApiResponse<BlogProfile>>(`/api/users/blogs/${blogUsername}/profile`);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "블로그 프로필을 불러오지 못했습니다."));
  }
}

export async function subscribeToUser(userId: number) {
  try {
    const response = await apiClient.post<ApiResponse<SubscriptionActionResponse>>(`/api/users/${userId}/subscribe`);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "구독에 실패했습니다."));
  }
}

export async function unsubscribeFromUser(userId: number) {
  try {
    const response = await apiClient.delete<ApiResponse<SubscriptionActionResponse>>(`/api/users/${userId}/subscribe`);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "구독 취소에 실패했습니다."));
  }
}

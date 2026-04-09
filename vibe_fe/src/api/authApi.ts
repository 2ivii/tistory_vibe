import { AxiosError } from "axios";
import { apiClient } from "./client";
import type { ApiErrorResponse, ApiResponse } from "../types/api";
import type { CurrentUser, LoginRequest, LoginResponse, SignUpRequest } from "../types/auth";
import { clearAuthSession, setAccessToken, setCurrentUser } from "../utils/authStorage";

function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.data?.message ?? fallback;
  }

  return fallback;
}

export async function login(payload: LoginRequest) {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/api/auth/login", payload);
    setAccessToken(response.data.data.accessToken);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "로그인에 실패했습니다."));
  }
}

export async function signUp(payload: SignUpRequest) {
  try {
    const response = await apiClient.post<ApiResponse<{ id: number; email: string; nickname: string; blogUsername: string }>>(
      "/api/auth/signup",
      payload
    );
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "회원가입에 실패했습니다."));
  }
}

export async function fetchMyInfo() {
  try {
    const response = await apiClient.get<ApiResponse<CurrentUser>>("/api/users/me");
    setCurrentUser(response.data.data);
    return response.data.data;
  } catch (error) {
    clearAuthSession();
    throw new Error(extractErrorMessage(error, "사용자 정보를 불러오지 못했습니다."));
  }
}

export function logout() {
  clearAuthSession();
}

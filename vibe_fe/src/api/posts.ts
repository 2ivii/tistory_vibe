import { AxiosError } from "axios";
import { apiClient } from "./client";
import type { ApiErrorResponse, ApiResponse } from "../types/api";
import type { PostDetail, PostFormValues, PostListParams, PostPage } from "../types/post";

function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.data?.message ?? fallback;
  }

  return fallback;
}

export async function getPosts(params: PostListParams = {}) {
  try {
    const response = await apiClient.get<ApiResponse<PostPage>>("/api/posts", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "게시글 목록을 불러오지 못했습니다."));
  }
}

export async function getPost(postId: string | number) {
  try {
    const response = await apiClient.get<ApiResponse<PostDetail>>(`/api/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "게시글을 불러오지 못했습니다."));
  }
}

export async function createPost(payload: PostFormValues) {
  try {
    const response = await apiClient.post<ApiResponse<PostDetail>>("/api/posts", payload);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "게시글 작성에 실패했습니다."));
  }
}

export async function updatePost(postId: string | number, payload: PostFormValues) {
  try {
    const response = await apiClient.patch<ApiResponse<PostDetail>>(`/api/posts/${postId}`, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "게시글 수정에 실패했습니다."));
  }
}

export async function deletePost(postId: string | number) {
  try {
    await apiClient.delete<ApiResponse<null>>(`/api/posts/${postId}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error, "게시글 삭제에 실패했습니다."));
  }
}

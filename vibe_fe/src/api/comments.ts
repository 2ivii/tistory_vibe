import { AxiosError } from "axios";
import { apiClient } from "./client";
import type { ApiErrorResponse, ApiResponse } from "../types/api";
import type { Comment, CommentCreateRequest } from "../types/comment";

function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.data?.message ?? fallback;
  }

  return fallback;
}

export async function getComments(postId: string | number) {
  try {
    const response = await apiClient.get<ApiResponse<Comment[]>>(`/api/posts/${postId}/comments`);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "댓글 목록을 불러오지 못했습니다."));
  }
}

export async function createComment(postId: string | number, payload: CommentCreateRequest) {
  try {
    const response = await apiClient.post<ApiResponse<Comment>>(`/api/posts/${postId}/comments`, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "댓글 작성에 실패했습니다."));
  }
}

export async function deleteComment(commentId: string | number) {
  try {
    await apiClient.delete<ApiResponse<null>>(`/api/comments/${commentId}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error, "댓글 삭제에 실패했습니다."));
  }
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  data: {
    code: string;
    message: string;
  } | null;
  message: string;
};

import type { LoginRequest, SignUpRequest } from "../types/auth";

export async function login(payload: LoginRequest) {
  return Promise.resolve({
    message: "로그인 API placeholder",
    payload
  });
}

export async function signUp(payload: SignUpRequest) {
  return Promise.resolve({
    message: "회원가입 API placeholder",
    payload
  });
}

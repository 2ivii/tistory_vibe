package com.vibe.vibebe.auth.controller;

import com.vibe.vibebe.auth.dto.LoginRequest;
import com.vibe.vibebe.auth.dto.LoginResponse;
import com.vibe.vibebe.auth.dto.SignUpRequest;
import com.vibe.vibebe.auth.dto.SignUpResponse;
import com.vibe.vibebe.auth.service.AuthService;
import com.vibe.vibebe.global.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.success("ok", "backend is running");
    }

    @PostMapping("/api/auth/signup")
    public ApiResponse<SignUpResponse> signUp(@Valid @RequestBody SignUpRequest request) {
        return ApiResponse.success(authService.signUp(request), "회원가입이 완료되었습니다.");
    }

    @PostMapping("/api/auth/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request), "로그인에 성공했습니다.");
    }
}

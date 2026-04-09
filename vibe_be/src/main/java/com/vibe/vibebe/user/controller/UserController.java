package com.vibe.vibebe.user.controller;

import com.vibe.vibebe.global.common.ApiResponse;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.user.dto.BlogProfileResponse;
import com.vibe.vibebe.user.dto.MyInfoResponse;
import com.vibe.vibebe.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<MyInfoResponse> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(userService.getMyInfo(userDetails), "내 정보를 조회했습니다.");
    }

    @GetMapping("/blogs/{blogUsername}/profile")
    public ApiResponse<BlogProfileResponse> getBlogProfile(
            @PathVariable String blogUsername,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(userService.getBlogProfile(blogUsername, userDetails), "블로그 프로필을 조회했습니다.");
    }
}

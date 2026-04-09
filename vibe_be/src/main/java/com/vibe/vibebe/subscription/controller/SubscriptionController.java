package com.vibe.vibebe.subscription.controller;

import com.vibe.vibebe.global.common.ApiResponse;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.subscription.dto.SubscriptionActionResponse;
import com.vibe.vibebe.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/{userId}/subscribe")
    public ApiResponse<SubscriptionActionResponse> subscribe(
            @PathVariable Long userId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(subscriptionService.subscribe(userId, userDetails), "사용자를 구독했습니다.");
    }

    @DeleteMapping("/{userId}/subscribe")
    public ApiResponse<SubscriptionActionResponse> unsubscribe(
            @PathVariable Long userId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(subscriptionService.unsubscribe(userId, userDetails), "구독을 취소했습니다.");
    }
}

package com.vibe.vibebe.user.dto;

public record MyInfoResponse(
        Long id,
        String email,
        String nickname,
        String blogUsername,
        String blogTitle,
        String bio,
        String role
) {
}

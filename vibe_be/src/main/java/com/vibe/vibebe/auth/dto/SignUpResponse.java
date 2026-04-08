package com.vibe.vibebe.auth.dto;

public record SignUpResponse(
        Long id,
        String email,
        String nickname,
        String blogUsername
) {
}

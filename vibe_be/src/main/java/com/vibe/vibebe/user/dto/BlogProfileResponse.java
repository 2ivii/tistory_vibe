package com.vibe.vibebe.user.dto;

public record BlogProfileResponse(
        Long userId,
        String nickname,
        String blogUsername,
        String blogTitle,
        String bio,
        long postCount,
        long subscriberCount,
        boolean subscribedByMe,
        boolean isOwner
) {
}

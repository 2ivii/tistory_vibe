package com.vibe.vibebe.subscription.dto;

public record SubscriptionActionResponse(
        Long targetUserId,
        boolean subscribed,
        long subscriberCount
) {
}

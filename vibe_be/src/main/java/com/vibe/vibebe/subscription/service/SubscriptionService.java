package com.vibe.vibebe.subscription.service;

import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.subscription.domain.Subscription;
import com.vibe.vibebe.subscription.dto.SubscriptionActionResponse;
import com.vibe.vibebe.subscription.repository.SubscriptionRepository;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Transactional
    public SubscriptionActionResponse subscribe(Long targetUserId, CustomUserDetails userDetails) {
        User subscriber = getUser(userDetails.getUserId());
        User targetUser = getUser(targetUserId);

        validateSelfSubscription(subscriber.getId(), targetUser.getId());

        if (subscriptionRepository.existsBySubscriberIdAndTargetUserId(subscriber.getId(), targetUser.getId())) {
            throw new BusinessException(HttpStatus.CONFLICT, "이미 구독한 사용자입니다.");
        }

        subscriptionRepository.save(Subscription.create(subscriber, targetUser));
        long subscriberCount = subscriptionRepository.countByTargetUserId(targetUser.getId());

        return new SubscriptionActionResponse(targetUser.getId(), true, subscriberCount);
    }

    @Transactional
    public SubscriptionActionResponse unsubscribe(Long targetUserId, CustomUserDetails userDetails) {
        User subscriber = getUser(userDetails.getUserId());
        User targetUser = getUser(targetUserId);

        validateSelfSubscription(subscriber.getId(), targetUser.getId());

        Subscription subscription = subscriptionRepository.findBySubscriberIdAndTargetUserId(subscriber.getId(), targetUser.getId())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "구독 정보를 찾을 수 없습니다."));

        subscriptionRepository.delete(subscription);
        long subscriberCount = subscriptionRepository.countByTargetUserId(targetUser.getId());

        return new SubscriptionActionResponse(targetUser.getId(), false, subscriberCount);
    }

    @Transactional(readOnly = true)
    public long getSubscriberCount(Long targetUserId) {
        return subscriptionRepository.countByTargetUserId(targetUserId);
    }

    @Transactional(readOnly = true)
    public boolean isSubscribedBy(Long subscriberId, Long targetUserId) {
        if (subscriberId == null || subscriberId.equals(targetUserId)) {
            return false;
        }

        return subscriptionRepository.existsBySubscriberIdAndTargetUserId(subscriberId, targetUserId);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }

    private void validateSelfSubscription(Long subscriberId, Long targetUserId) {
        if (subscriberId.equals(targetUserId)) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "자기 자신은 구독할 수 없습니다.");
        }
    }
}

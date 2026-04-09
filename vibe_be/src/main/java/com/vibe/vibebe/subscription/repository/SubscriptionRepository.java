package com.vibe.vibebe.subscription.repository;

import com.vibe.vibebe.subscription.domain.Subscription;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    boolean existsBySubscriberIdAndTargetUserId(Long subscriberId, Long targetUserId);

    long countByTargetUserId(Long targetUserId);

    Optional<Subscription> findBySubscriberIdAndTargetUserId(Long subscriberId, Long targetUserId);
}

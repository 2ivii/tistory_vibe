package com.vibe.vibebe.user.service;

import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.post.repository.PostRepository;
import com.vibe.vibebe.subscription.service.SubscriptionService;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.dto.BlogProfileResponse;
import com.vibe.vibebe.user.dto.MyInfoResponse;
import com.vibe.vibebe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final SubscriptionService subscriptionService;

    @Transactional(readOnly = true)
    public MyInfoResponse getMyInfo(CustomUserDetails userDetails) {
        User user = getUser(userDetails.getUserId());

        return new MyInfoResponse(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getBlogUsername(),
                user.getBlogTitle(),
                user.getBio(),
                user.getRole().name()
        );
    }

    @Transactional(readOnly = true)
    public BlogProfileResponse getBlogProfile(String blogUsername, CustomUserDetails userDetails) {
        User user = userRepository.findByBlogUsername(blogUsername)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "블로그 사용자를 찾을 수 없습니다."));

        long postCount = postRepository.countByAuthorIdAndPublishedTrue(user.getId());
        long subscriberCount = subscriptionService.getSubscriberCount(user.getId());
        Long currentUserId = userDetails != null ? userDetails.getUserId() : null;
        boolean isOwner = currentUserId != null && currentUserId.equals(user.getId());
        boolean subscribedByMe = subscriptionService.isSubscribedBy(currentUserId, user.getId());

        return new BlogProfileResponse(
                user.getId(),
                user.getNickname(),
                user.getBlogUsername(),
                user.getBlogTitle(),
                user.getBio(),
                postCount,
                subscriberCount,
                subscribedByMe,
                isOwner
        );
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }
}

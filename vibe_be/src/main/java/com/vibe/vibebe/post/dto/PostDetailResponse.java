package com.vibe.vibebe.post.dto;

import com.vibe.vibebe.post.domain.Post;
import java.time.LocalDateTime;

public record PostDetailResponse(
        Long id,
        String title,
        String summary,
        String content,
        String authorNickname,
        String authorBlogUsername,
        int likeCount,
        int commentCount,
        int viewCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        boolean mine
) {

    public static PostDetailResponse from(Post post, Long currentUserId) {
        return new PostDetailResponse(
                post.getId(),
                post.getTitle(),
                post.getSummary(),
                post.getContent(),
                post.getAuthor().getNickname(),
                post.getAuthor().getBlogUsername(),
                post.getLikeCount(),
                post.getCommentCount(),
                post.getViewCount(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                currentUserId != null && post.isAuthor(currentUserId)
        );
    }
}

package com.vibe.vibebe.post.dto;

import com.vibe.vibebe.post.domain.Post;
import java.time.LocalDateTime;

public record PostSummaryResponse(
        Long id,
        String title,
        String summary,
        String authorNickname,
        String authorBlogUsername,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static PostSummaryResponse from(Post post) {
        return new PostSummaryResponse(
                post.getId(),
                post.getTitle(),
                post.getSummary(),
                post.getAuthor().getNickname(),
                post.getAuthor().getBlogUsername(),
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }
}

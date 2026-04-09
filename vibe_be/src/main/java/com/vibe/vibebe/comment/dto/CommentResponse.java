package com.vibe.vibebe.comment.dto;

import com.vibe.vibebe.comment.domain.Comment;
import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        Long postId,
        String content,
        String authorNickname,
        String authorBlogUsername,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        boolean mine
) {

    public static CommentResponse from(Comment comment, Long currentUserId) {
        return new CommentResponse(
                comment.getId(),
                comment.getPost().getId(),
                comment.getContent(),
                comment.getAuthor().getNickname(),
                comment.getAuthor().getBlogUsername(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                currentUserId != null && comment.isAuthor(currentUserId)
        );
    }
}

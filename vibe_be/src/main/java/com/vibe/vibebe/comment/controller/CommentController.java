package com.vibe.vibebe.comment.controller;

import com.vibe.vibebe.comment.dto.CommentCreateRequest;
import com.vibe.vibebe.comment.dto.CommentResponse;
import com.vibe.vibebe.comment.service.CommentService;
import com.vibe.vibebe.global.common.ApiResponse;
import com.vibe.vibebe.global.security.CustomUserDetails;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/posts/{postId}/comments")
    public ResponseEntity<ApiResponse<CommentResponse>> createComment(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CommentCreateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(commentService.createComment(postId, userDetails, request), "댓글이 작성되었습니다."));
    }

    @GetMapping("/api/posts/{postId}/comments")
    public ApiResponse<List<CommentResponse>> getComments(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(commentService.getComments(postId, userDetails), "댓글 목록을 조회했습니다.");
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ApiResponse<Void> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        commentService.deleteComment(commentId, userDetails);
        return ApiResponse.success(null, "댓글이 삭제되었습니다.");
    }
}

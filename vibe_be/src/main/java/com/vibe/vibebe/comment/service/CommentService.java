package com.vibe.vibebe.comment.service;

import com.vibe.vibebe.comment.domain.Comment;
import com.vibe.vibebe.comment.dto.CommentCreateRequest;
import com.vibe.vibebe.comment.dto.CommentResponse;
import com.vibe.vibebe.comment.repository.CommentRepository;
import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.post.domain.Post;
import com.vibe.vibebe.post.repository.PostRepository;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentResponse createComment(Long postId, CustomUserDetails userDetails, CommentCreateRequest request) {
        Post post = getPublishedPost(postId);
        User author = getUser(userDetails.getUserId());

        Comment comment = Comment.builder()
                .post(post)
                .author(author)
                .content(request.content())
                .build();

        Comment savedComment = commentRepository.save(comment);
        post.increaseCommentCount();

        return CommentResponse.from(savedComment, userDetails.getUserId());
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(Long postId, CustomUserDetails userDetails) {
        getPublishedPost(postId);

        Long currentUserId = userDetails != null ? userDetails.getUserId() : null;
        return commentRepository.findByPost_IdOrderByCreatedAtAsc(postId).stream()
                .map(comment -> CommentResponse.from(comment, currentUserId))
                .toList();
    }

    @Transactional
    public void deleteComment(Long commentId, CustomUserDetails userDetails) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다."));

        if (!comment.isAuthor(userDetails.getUserId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "본인이 작성한 댓글만 삭제할 수 있습니다.");
        }

        comment.getPost().decreaseCommentCount();
        commentRepository.delete(comment);
    }

    @Transactional
    public void deleteCommentsByPostId(Long postId) {
        commentRepository.deleteAllByPost_Id(postId);
    }

    private Post getPublishedPost(Long postId) {
        return postRepository.findByIdAndPublishedTrue(postId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }
}

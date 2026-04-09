package com.vibe.vibebe.post.service;

import com.vibe.vibebe.comment.service.CommentService;
import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.post.domain.Post;
import com.vibe.vibebe.post.dto.PostCreateRequest;
import com.vibe.vibebe.post.dto.PostDetailResponse;
import com.vibe.vibebe.post.dto.PostPageResponse;
import com.vibe.vibebe.post.dto.PostSummaryResponse;
import com.vibe.vibebe.post.dto.PostUpdateRequest;
import com.vibe.vibebe.post.repository.PostRepository;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentService commentService;

    @Transactional
    public PostDetailResponse createPost(CustomUserDetails userDetails, PostCreateRequest request) {
        User author = getUser(userDetails.getUserId());

        Post post = Post.builder()
                .author(author)
                .title(request.title())
                .summary(request.summary())
                .content(request.content())
                .published(true)
                .build();

        Post savedPost = postRepository.save(post);
        return PostDetailResponse.from(savedPost, author.getId());
    }

    @Transactional(readOnly = true)
    public PostPageResponse getPosts(String blogUsername, Pageable pageable) {
        Page<PostSummaryResponse> page = (blogUsername == null || blogUsername.isBlank())
                ? postRepository.findAllByPublishedTrue(pageable).map(PostSummaryResponse::from)
                : postRepository.findAllByAuthor_BlogUsernameAndPublishedTrue(blogUsername, pageable).map(PostSummaryResponse::from);

        return PostPageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPost(Long postId, CustomUserDetails userDetails) {
        Post post = postRepository.findByIdAndPublishedTrue(postId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        Long currentUserId = userDetails != null ? userDetails.getUserId() : null;
        return PostDetailResponse.from(post, currentUserId);
    }

    @Transactional
    public PostDetailResponse updatePost(Long postId, CustomUserDetails userDetails, PostUpdateRequest request) {
        Post post = getPostEntity(postId);
        validateAuthor(post, userDetails.getUserId());

        post.update(request.title(), request.summary(), request.content());
        return PostDetailResponse.from(post, userDetails.getUserId());
    }

    @Transactional
    public void deletePost(Long postId, CustomUserDetails userDetails) {
        Post post = getPostEntity(postId);
        validateAuthor(post, userDetails.getUserId());
        commentService.deleteCommentsByPostId(postId);
        postRepository.delete(post);
    }

    private Post getPostEntity(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }

    private void validateAuthor(Post post, Long userId) {
        if (!post.isAuthor(userId)) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "본인이 작성한 게시글만 수정 또는 삭제할 수 있습니다.");
        }
    }
}

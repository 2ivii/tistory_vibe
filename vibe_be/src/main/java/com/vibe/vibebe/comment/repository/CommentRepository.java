package com.vibe.vibebe.comment.repository;

import com.vibe.vibebe.comment.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPost_IdOrderByCreatedAtAsc(Long postId);

    long countByPost_Id(Long postId);
}

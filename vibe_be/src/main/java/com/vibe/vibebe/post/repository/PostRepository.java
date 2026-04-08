package com.vibe.vibebe.post.repository;

import com.vibe.vibebe.post.domain.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByPublishedTrueOrderByCreatedAtDesc();

    List<Post> findByAuthor_BlogUsernameAndPublishedTrueOrderByCreatedAtDesc(String blogUsername);
}

package com.vibe.vibebe.post.repository;

import com.vibe.vibebe.post.domain.Post;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByPublishedTrue(Pageable pageable);

    Page<Post> findAllByAuthor_BlogUsernameAndPublishedTrue(String blogUsername, Pageable pageable);

    Optional<Post> findByIdAndPublishedTrue(Long id);
}

package com.vibe.vibebe.user.repository;

import com.vibe.vibebe.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByBlogUsername(String blogUsername);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByBlogUsername(String blogUsername);
}

package com.vibe.vibebe.user.domain;

import com.vibe.vibebe.global.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 30)
    private String nickname;

    @Column(nullable = false, unique = true, length = 50)
    private String blogUsername;

    @Column(nullable = false, length = 100)
    private String blogTitle;

    @Column(length = 500)
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;

    @Builder
    public User(String email, String password, String nickname, String blogUsername, String blogTitle, String bio, UserRole role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.blogUsername = blogUsername;
        this.blogTitle = blogTitle;
        this.bio = bio;
        this.role = role;
    }

    public static User create(String email, String password, String nickname, String blogUsername) {
        return User.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .blogUsername(blogUsername)
                .blogTitle(nickname + "의 블로그")
                .role(UserRole.USER)
                .build();
    }
}

package com.vibe.vibebe.post.domain;

import com.vibe.vibebe.global.common.BaseEntity;
import com.vibe.vibebe.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 255)
    private String summary;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private boolean published;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private int commentCount;

    @Column(nullable = false)
    private int viewCount;

    @Builder
    public Post(User author, String title, String summary, String content, boolean published) {
        this.author = author;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.published = published;
        this.likeCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
    }

    public void update(String title, String summary, String content) {
        this.title = title;
        this.summary = summary;
        this.content = content;
    }

    public boolean isAuthor(Long userId) {
        return author != null && author.getId().equals(userId);
    }
}

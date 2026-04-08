import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { PostListItem } from "../components/PostListItem";
import { getFeaturedPosts, getLatestPosts, getPopularPosts } from "../api/postApi";
import { usePageTitle } from "../hooks/usePageTitle";

export function HomePage() {
  usePageTitle("메인");
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts();
  const popularPosts = getPopularPosts();
  const creatorGroups = [
    {
      title: "스토리 크리에이터",
      items: popularPosts
    },
    {
      title: "기록보관소",
      items: latestPosts.slice(1, 3)
    }
  ];

  return (
    <div className="container home-page">
      <div className="home-layout">
        <section className="home-main">
          <section className="spotlight-grid">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <PostCard key={post.id} post={post} compact={index === 0} />
            ))}
          </section>

          <section className="home-ranking">
            {latestPosts.slice(0, 5).map((post, index) => (
              <PostListItem key={post.id} post={post} rank={index + 1} showThumbnail />
            ))}
          </section>
        </section>

        <aside className="home-sidebar">
          <section className="login-prompt">
            <p>티스토리에 로그인하고 더 많은 기능을 이용해보세요!</p>
            <button type="button" className="social-start-button">
              카카오계정으로 시작하기
            </button>
          </section>

          {creatorGroups.map((group) => (
            <section key={group.title} className="creator-panel">
              <div className="creator-panel__heading">
                <h2>{group.title}</h2>
                <span className="creator-panel__badge">S</span>
              </div>
              <div className="creator-collection">
                {group.items.map((post) => (
                  <div key={`${group.title}-${post.id}`} className="creator-card">
                    <div className="creator-card__header">
                      <div>
                        <strong>{post.authorDisplayName}</strong>
                        <p>
                          {post.category} 크리에이터 · {post.likeCount * 97}명 구독
                        </p>
                      </div>
                      <button type="button" className="subscribe-button">
                        + 구독
                      </button>
                    </div>
                    <div className="creator-post-list">
                      <Link to={`/posts/${post.id}`} className="creator-post-item">
                        <div>
                          <strong>{post.title}</strong>
                          <p>
                            좋아요 {post.likeCount} · 댓글 {post.commentCount} · {post.readTime}
                          </p>
                        </div>
                        <div className={`creator-post-item__thumb creator-post-item__thumb--${post.id}`} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="sidebar-pager">
            <button type="button" className="pager-button">
              ‹
            </button>
            <span>1 / 16</span>
            <button type="button" className="pager-button">
              ›
            </button>
          </div>
        </aside>
      </div>

      <section className="home-more-link">
        <Link to="/posts" className="button ghost">
          전체 글 보러가기
        </Link>
        <Link to="/posts/new" className="button secondary">
          글 작성하기
        </Link>
      </section>
    </div>
  );
}

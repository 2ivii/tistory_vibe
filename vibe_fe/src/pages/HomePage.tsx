import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { PostListItem } from "../components/PostListItem";
import { usePageTitle } from "../hooks/usePageTitle";
import type { PostSummary } from "../types/post";

export function HomePage() {
  usePageTitle("메인");

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        const response = await getPosts({ page: 0, size: 6 });

        if (active) {
          setPosts(response.content);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const featuredPosts = posts.slice(0, 2);
  const latestPosts = posts;
  const creatorGroups = [
    {
      title: "스토리 크리에이터",
      items: posts.slice(0, 3)
    },
    {
      title: "기록보관소",
      items: posts.slice(3, 5)
    }
  ];

  return (
    <div className="container home-page">
      <div className="home-layout">
        <section className="home-main">
          <section className="spotlight-grid">
            {loading ? <div className="card">메인 글을 불러오는 중입니다.</div> : null}
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
                        <strong>{post.authorNickname}</strong>
                        <p>{post.authorBlogUsername} 크리에이터</p>
                      </div>
                      <button type="button" className="subscribe-button">
                        + 구독
                      </button>
                    </div>
                    <div className="creator-post-list">
                      <Link to={`/posts/${post.id}`} className="creator-post-item">
                        <div>
                          <strong>{post.title}</strong>
                          <p>최신 글 · {post.authorNickname}</p>
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
            <span>1 / 1</span>
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

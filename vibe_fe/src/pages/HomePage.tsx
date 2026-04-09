import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogProfile, subscribeToUser, unsubscribeFromUser } from "../api/blogApi";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { PostListItem } from "../components/PostListItem";
import { SubscriptionButton } from "../components/SubscriptionButton";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { BlogProfile } from "../types/blog";
import type { PostSummary } from "../types/post";

type RecommendedCreator = {
  profile: BlogProfile;
  post: PostSummary;
  loading: boolean;
  error: string | null;
};

export function HomePage() {
  usePageTitle("메인");

  const session = useAuthSession();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [myBlogProfile, setMyBlogProfile] = useState<BlogProfile | null>(null);
  const [myBlogProfileLoading, setMyBlogProfileLoading] = useState(false);
  const [recommendedCreators, setRecommendedCreators] = useState<RecommendedCreator[]>([]);
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
  const user = session.user;
  const myPosts = user ? posts.filter((post) => post.authorBlogUsername === user.blogUsername) : [];
  const estimatedViews = myPosts.length * 137 + 24;
  const estimatedVisitors = Math.max(myPosts.length * 18, user ? 9 : 0);
  const estimatedRevenue = myPosts.length > 0 ? `₩${(myPosts.length * 3200).toLocaleString()}` : "내 수익 예측해보기";
  const myBlogUsername = user?.blogUsername || user?.primaryBlogUsername || "";
  const myBlogPath = myBlogUsername ? `/blog/${myBlogUsername}` : "/";
  const creatorGroups = [
    {
      title: "스토리 크리에이터",
      items: recommendedCreators.slice(0, 3)
    },
    {
      title: "기록보관소",
      items: recommendedCreators.slice(3, 5)
    }
  ];

  useEffect(() => {
    let active = true;

    async function loadRecommendedCreators() {
      const uniquePosts = posts.filter(
        (post, index, currentPosts) =>
          currentPosts.findIndex((item) => item.authorBlogUsername === post.authorBlogUsername) === index
      );

      if (uniquePosts.length === 0) {
        setRecommendedCreators([]);
        return;
      }

      const profiles: Array<RecommendedCreator | null> = await Promise.all(
        uniquePosts.map(async (post) => {
          try {
            const profile = await getBlogProfile(post.authorBlogUsername);
            return {
              profile,
              post,
              loading: false,
              error: null
            };
          } catch (error) {
            return null;
          }
        })
      );

      if (active) {
        setRecommendedCreators(profiles.filter((item): item is RecommendedCreator => item !== null));
      }
    }

    void loadRecommendedCreators();

    return () => {
      active = false;
    };
  }, [posts]);

  useEffect(() => {
    if (!session.isLoggedIn || !myBlogUsername) {
      setMyBlogProfile(null);
      return;
    }

    let active = true;

    async function loadMyBlogProfile() {
      try {
        setMyBlogProfileLoading(true);
        const profile = await getBlogProfile(myBlogUsername);

        if (active) {
          setMyBlogProfile(profile);
        }
      } catch {
        if (active) {
          setMyBlogProfile(null);
        }
      } finally {
        if (active) {
          setMyBlogProfileLoading(false);
        }
      }
    }

    void loadMyBlogProfile();

    return () => {
      active = false;
    };
  }, [myBlogUsername, session.isLoggedIn]);

  async function handleToggleCreatorSubscription(targetUserId: number) {
    const target = recommendedCreators.find((item) => item.profile.userId === targetUserId);

    if (!target || target.profile.isOwner || target.loading) {
      return;
    }

    if (!session.isLoggedIn) {
      setRecommendedCreators((currentCreators) =>
        currentCreators.map((creator) =>
          creator.profile.userId === targetUserId
            ? {
                ...creator,
                error: "로그인 후 구독할 수 있습니다."
              }
            : creator
        )
      );
      return;
    }

    const nextSubscribed = !target.profile.subscribedByMe;
    const nextSubscriberCount = Math.max(0, target.profile.subscriberCount + (nextSubscribed ? 1 : -1));

    setRecommendedCreators((currentCreators) =>
      currentCreators.map((creator) =>
        creator.profile.userId === targetUserId
          ? {
              ...creator,
              loading: true,
              error: null,
              profile: {
                ...creator.profile,
                subscribedByMe: nextSubscribed,
                subscriberCount: nextSubscriberCount
              }
            }
          : creator
      )
    );

    try {
      const response = target.profile.subscribedByMe
        ? await unsubscribeFromUser(targetUserId)
        : await subscribeToUser(targetUserId);

      setRecommendedCreators((currentCreators) =>
        currentCreators.map((creator) =>
          creator.profile.userId === targetUserId
            ? {
                ...creator,
                loading: false,
                profile: {
                  ...creator.profile,
                  subscribedByMe: response.subscribed,
                  subscriberCount: response.subscriberCount
                }
              }
            : creator
        )
      );
    } catch (error) {
      setRecommendedCreators((currentCreators) =>
        currentCreators.map((creator) =>
          creator.profile.userId === targetUserId
            ? {
                ...creator,
                loading: false,
                error: error instanceof Error ? error.message : "구독 상태를 변경하지 못했습니다.",
                profile: target.profile
              }
            : creator
        )
      );
    }
  }

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
          {session.isLoggedIn && user ? (
            <section className="profile-sidebar-card">
              <div className="profile-sidebar-card__identity">
                <div className="profile-sidebar-card__avatar">{user.nickname.slice(0, 1)}</div>
                <div>
                  <strong className="profile-sidebar-card__name">{user.nickname}</strong>
                  <p className="profile-sidebar-card__meta">
                    {myBlogProfileLoading ? "구독자 수 불러오는 중" : `구독자 ${myBlogProfile?.subscriberCount ?? 0}명`}
                  </p>
                </div>
                <button type="button" className="profile-sidebar-card__expand" aria-label="사용자 메뉴">
                  ˅
                </button>
              </div>

              <div className="profile-sidebar-card__actions">
                <Link to="/posts/new" className="profile-sidebar-card__action">
                  글쓰기
                </Link>
                <Link to={myBlogPath} className="profile-sidebar-card__action">
                  내 블로그
                </Link>
                <Link to={myBlogPath} className="profile-sidebar-card__action">
                  관리
                </Link>
              </div>

              <div className="profile-sidebar-card__stats">
                <Link to={myBlogPath} className="profile-stat-row">
                  <span>조회수</span>
                  <strong>{estimatedViews.toLocaleString()}회</strong>
                </Link>
                <Link to={myBlogPath} className="profile-stat-row">
                  <span>방문자</span>
                  <strong>{estimatedVisitors.toLocaleString()}명</strong>
                </Link>
                <Link to={myBlogPath} className="profile-stat-row">
                  <span>수익</span>
                  <strong>{estimatedRevenue}</strong>
                </Link>
              </div>
            </section>
          ) : (
            <section className="login-prompt">
              <p>티스토리에 로그인하고 더 많은 기능을 이용해보세요!</p>
              <Link to="/login" className="social-start-button">
                카카오계정으로 시작하기
              </Link>
            </section>
          )}

          {creatorGroups.map((group) => (
            <section key={group.title} className="creator-panel">
              <div className="creator-panel__heading">
                <h2>{group.title}</h2>
                <span className="creator-panel__badge">S</span>
              </div>
              <div className="creator-collection">
                {group.items.map((creator) => (
                  <div key={`${group.title}-${creator.profile.userId}`} className="creator-card">
                    <div className="creator-card__header">
                      <div>
                        <strong>{creator.profile.displayName}</strong>
                        <p>{creator.profile.username} 크리에이터 · 구독자 {creator.profile.subscriberCount}명</p>
                      </div>
                      {!creator.profile.isOwner ? (
                        <SubscriptionButton
                          subscribed={creator.profile.subscribedByMe}
                          loading={creator.loading}
                          onClick={() => {
                            void handleToggleCreatorSubscription(creator.profile.userId);
                          }}
                        />
                      ) : null}
                    </div>
                    {creator.error ? <p className="helper-text creator-card__error">{creator.error}</p> : null}
                    <div className="creator-post-list">
                      <Link to={`/posts/${creator.post.id}`} className="creator-post-item">
                        <div>
                          <strong>{creator.post.title}</strong>
                          <p>최신 글 · {creator.profile.displayName}</p>
                        </div>
                        <div className={`creator-post-item__thumb creator-post-item__thumb--${creator.post.id}`} />
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

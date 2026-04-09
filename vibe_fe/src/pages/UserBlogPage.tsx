import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogProfile, subscribeToUser, unsubscribeFromUser } from "../api/blogApi";
import { getPosts } from "../api/posts";
import { BlogProfileCard } from "../components/BlogProfileCard";
import { PostListItem } from "../components/PostListItem";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { BlogProfile } from "../types/blog";
import type { PostSummary } from "../types/post";

export function UserBlogPage() {
  const { username = "unknown" } = useParams();
  const session = useAuthSession();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<BlogProfile | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);

  usePageTitle(profile ? profile.blogTitle : `${username} 블로그`);

  useEffect(() => {
    let active = true;

    async function loadBlogPage() {
      try {
        setLoading(true);
        setError(null);
        setSubscriptionError(null);
        const [profileResponse, postsResponse] = await Promise.all([
          getBlogProfile(username),
          getPosts({ blogUsername: username, page: 0, size: 20 })
        ]);

        if (active) {
          setProfile(profileResponse);
          setPosts(postsResponse.content);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다.");
          setProfile(null);
          setPosts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadBlogPage();

    return () => {
      active = false;
    };
  }, [username]);

  async function handleToggleSubscription() {
    if (!profile || profile.isOwner || subscriptionLoading) {
      return;
    }

    if (!session.isLoggedIn) {
      setSubscriptionError("로그인 후 구독할 수 있습니다.");
      return;
    }

    const previousProfile = profile;
    const nextSubscribed = !profile.subscribedByMe;
    const nextSubscriberCount = Math.max(0, profile.subscriberCount + (nextSubscribed ? 1 : -1));

    setSubscriptionLoading(true);
    setSubscriptionError(null);
    setProfile({
      ...profile,
      subscribedByMe: nextSubscribed,
      subscriberCount: nextSubscriberCount
    });

    try {
      const response = profile.subscribedByMe
        ? await unsubscribeFromUser(profile.userId)
        : await subscribeToUser(profile.userId);

      setProfile((currentProfile) =>
        currentProfile
          ? {
              ...currentProfile,
              subscribedByMe: response.subscribed,
              subscriberCount: response.subscriberCount
            }
          : currentProfile
      );
    } catch (toggleError) {
      setProfile(previousProfile);
      setSubscriptionError(toggleError instanceof Error ? toggleError.message : "구독 상태를 변경하지 못했습니다.");
    } finally {
      setSubscriptionLoading(false);
    }
  }

  return (
    <div className="container page-stack">
      {profile ? (
        <BlogProfileCard
          profile={profile}
          subscriptionLoading={subscriptionLoading}
          subscriptionError={subscriptionError}
          onToggleSubscription={handleToggleSubscription}
        />
      ) : null}

      {profile ? (
        <section className="card blog-overview-card">
          <div className="blog-overview-card__main">
            <div className="section-heading">
              <h2>{profile.isOwner ? "내 블로그 홈" : "블로그 정보"}</h2>
              <span>@{profile.username}</span>
            </div>
            <p className="blog-overview-card__description">
              {profile.blogTitle}에서 {profile.isOwner ? "작성한 글과 블로그 운영 현황" : "발행된 글과 블로그 소개"}를 확인할 수 있습니다.
            </p>
            <div className="blog-overview-card__tags">
              <span className="blog-overview-card__tag">전체글 {profile.postCount}</span>
              <span className="blog-overview-card__tag">구독자 {profile.subscriberCount}</span>
              <span className="blog-overview-card__tag">{profile.isOwner ? "내가 운영 중" : "크리에이터 블로그"}</span>
            </div>
          </div>
          <aside className="blog-overview-card__side">
            <div className="blog-overview-card__side-block">
              <strong>카테고리</strong>
              <p>전체 글</p>
              <span>{profile.postCount}개의 포스트</span>
            </div>
            <div className="blog-overview-card__side-block">
              <strong>블로그 소개</strong>
              <p>{profile.bio ?? "아직 소개글이 없습니다."}</p>
            </div>
          </aside>
        </section>
      ) : null}

      <section className="section-stack card blog-posts-card">
        <div className="section-heading">
          <h2>{profile?.isOwner ? "내가 작성한 글" : "최근 글"}</h2>
          <span>{posts.length}개의 포스트</span>
        </div>
        <div className="post-list">
          {loading ? <p className="helper-text">글을 불러오는 중입니다.</p> : null}
          {error ? <p className="helper-text">{error}</p> : null}
          {!loading && !error && posts.length === 0 ? (
            <p className="helper-text">{profile?.isOwner ? "아직 작성한 글이 없습니다." : "아직 작성된 글이 없습니다."}</p>
          ) : null}
          {!loading && !error ? posts.map((post) => <PostListItem key={post.id} post={post} />) : null}
        </div>
      </section>
    </div>
  );
}

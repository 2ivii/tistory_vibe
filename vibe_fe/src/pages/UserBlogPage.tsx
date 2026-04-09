import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buildMyBlogProfile, getBlogProfile } from "../api/blogApi";
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

  usePageTitle(profile ? profile.blogTitle : `${username} 블로그`);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await getPosts({ blogUsername: username, page: 0, size: 20 });

        if (active) {
          setPosts(response.content);
          if (session.user?.blogUsername === username) {
            setProfile(buildMyBlogProfile(session.user, response.totalElements));
          } else {
            setProfile(getBlogProfile(username, response.totalElements) ?? null);
          }
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다.");
          if (session.user?.blogUsername === username) {
            setProfile(buildMyBlogProfile(session.user));
          } else {
            setProfile(getBlogProfile(username) ?? null);
          }
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
  }, [session.user, username]);

  return (
    <div className="container page-stack">
      {profile ? <BlogProfileCard profile={profile} /> : null}

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

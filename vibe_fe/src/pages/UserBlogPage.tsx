import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogProfile } from "../api/blogApi";
import { getPosts } from "../api/posts";
import { BlogProfileCard } from "../components/BlogProfileCard";
import { PostListItem } from "../components/PostListItem";
import { usePageTitle } from "../hooks/usePageTitle";
import type { PostSummary } from "../types/post";

export function UserBlogPage() {
  const { username = "unknown" } = useParams();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const profile = getBlogProfile(username);

  usePageTitle(`${username} 블로그`);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await getPosts({ blogUsername: username, page: 0, size: 20 });

        if (active) {
          setPosts(response.content);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다.");
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
  }, [username]);

  return (
    <div className="container page-stack">
      {profile ? <BlogProfileCard profile={profile} /> : null}

      <section className="section-stack card blog-posts-card">
        <div className="section-heading">
          <h2>최근 글</h2>
          <span>{posts.length}개의 포스트</span>
        </div>
        <div className="post-list">
          {loading ? <div>글을 불러오는 중입니다.</div> : null}
          {error ? <div>{error}</div> : null}
          {!loading && !error && posts.length === 0 ? <div>아직 작성된 글이 없습니다.</div> : null}
          {!loading && !error ? posts.map((post) => <PostListItem key={post.id} post={post} />) : null}
        </div>
      </section>
    </div>
  );
}

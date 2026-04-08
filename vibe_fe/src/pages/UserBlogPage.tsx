import { useParams } from "react-router-dom";
import { getBlogProfile } from "../api/blogApi";
import { getPostsByUsername } from "../api/postApi";
import { BlogProfileCard } from "../components/BlogProfileCard";
import { PostListItem } from "../components/PostListItem";
import { usePageTitle } from "../hooks/usePageTitle";

export function UserBlogPage() {
  const { username = "unknown" } = useParams();
  const posts = getPostsByUsername(username);
  const profile = getBlogProfile(username);

  usePageTitle(`${username} 블로그`);

  return (
    <div className="container page-stack">
      {profile ? <BlogProfileCard profile={profile} /> : null}

      <section className="section-stack card blog-posts-card">
        <div className="section-heading">
          <h2>최근 글</h2>
          <span>{posts.length}개의 포스트</span>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

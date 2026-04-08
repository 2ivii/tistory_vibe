import { useParams } from "react-router-dom";
import { getPostsByUsername } from "../api/postApi";
import { PageIntro } from "../components/PageIntro";
import { PostCard } from "../components/PostCard";

export function UserBlogPage() {
  const { username = "unknown" } = useParams();
  const posts = getPostsByUsername(username);

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="User Blog"
        title={`${username}의 블로그`}
        description="사용자 소개, 카테고리, 구독, 방문 통계 등이 확장될 수 있는 개인 블로그 홈 화면입니다."
      />

      <section className="blog-profile card">
        <h2>블로그 소개</h2>
        <p>프론트엔드 구조 설계를 기록하는 개발 블로그입니다. 현재는 더미 데이터로 구성되어 있습니다.</p>
      </section>

      <section className="section-stack">
        <div className="section-heading">
          <h2>최근 글</h2>
          <span>{posts.length}개의 포스트</span>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

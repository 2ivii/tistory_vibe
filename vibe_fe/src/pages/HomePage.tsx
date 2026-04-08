import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { PostCard } from "../components/PostCard";
import { getFeaturedPosts } from "../api/postApi";

export function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Blog Platform"
        title="깔끔한 블로그 서비스의 시작점"
        description="티스토리와 유사한 흐름을 가진 프론트엔드 구조를 먼저 세우고, 이후 Spring Boot REST API 연동이 자연스럽게 이어지도록 설계한 초기 화면입니다."
      />

      <section className="hero-banner">
        <div>
          <h2>콘텐츠 중심 구조</h2>
          <p>메인, 인증, 글, 사용자 블로그 영역을 나눠서 확장 가능한 라우팅 기반으로 구성했습니다.</p>
        </div>
        <div className="hero-banner__actions">
          <Link to="/posts" className="button primary">
            글 목록 보기
          </Link>
          <Link to="/posts/new" className="button secondary">
            글 작성 화면
          </Link>
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading">
          <h2>추천 글</h2>
          <Link to="/posts">전체 글 보기</Link>
        </div>
        <div className="post-grid">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

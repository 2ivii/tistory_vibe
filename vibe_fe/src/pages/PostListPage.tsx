import { getPosts } from "../api/postApi";
import { PageIntro } from "../components/PageIntro";
import { PostCard } from "../components/PostCard";

export function PostListPage() {
  const posts = getPosts();

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Posts"
        title="글 목록"
        description="카테고리, 검색, 정렬, 페이지네이션이 들어갈 자리를 고려한 기본 목록 화면입니다."
      />

      <section className="toolbar card">
        <span>전체 {posts.length}개 글</span>
        <span>정렬: 최신순</span>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

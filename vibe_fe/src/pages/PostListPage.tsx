import { getPosts } from "../api/postApi";
import { PageIntro } from "../components/PageIntro";
import { PostListItem } from "../components/PostListItem";
import { usePageTitle } from "../hooks/usePageTitle";

export function PostListPage() {
  usePageTitle("글 목록");
  const posts = getPosts();

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Posts"
        title="새롭게 올라온 글"
        description="제목, 메타 정보, 요약이 안정적으로 읽히는 리스트 중심 구조입니다. 이후 검색과 정렬, 페이지네이션을 붙이기 쉽게 분리했습니다."
      />

      <div className="content-with-sidebar">
        <section className="section-stack">
          <section className="toolbar card">
            <span>전체 {posts.length}개 글</span>
            <div className="toolbar-actions">
              <span>정렬: 최신순</span>
              <span>필터: 전체</span>
            </div>
          </section>

          <section className="post-list">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </section>
        </section>

        <aside className="sidebar-panel card">
          <p className="page-intro__eyebrow">Browse</p>
          <h2>카테고리</h2>
          <ul className="simple-list">
            <li>프론트엔드</li>
            <li>React</li>
            <li>백엔드</li>
            <li>UX</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

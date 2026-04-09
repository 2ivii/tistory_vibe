import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { PageIntro } from "../components/PageIntro";
import { PostListItem } from "../components/PostListItem";
import { usePageTitle } from "../hooks/usePageTitle";
import type { PostPage } from "../types/post";

export function PostListPage() {
  usePageTitle("글 목록");

  const [pageData, setPageData] = useState<PostPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await getPosts({ page: 0, size: 10 });

        if (active) {
          setPageData(response);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "게시글 목록을 불러오지 못했습니다.");
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

  const posts = pageData?.content ?? [];

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
            <span>전체 {pageData?.totalElements ?? 0}개 글</span>
            <div className="toolbar-actions">
              <span>정렬: 최신순</span>
              <span>페이지: {(pageData?.page ?? 0) + 1}</span>
            </div>
          </section>

          <section className="post-list">
            {loading ? <div className="card">글 목록을 불러오는 중입니다.</div> : null}
            {error ? <div className="card">{error}</div> : null}
            {!loading && !error && posts.length === 0 ? <div className="card">아직 작성된 게시글이 없습니다.</div> : null}
            {!loading && !error ? posts.map((post) => <PostListItem key={post.id} post={post} />) : null}
          </section>
        </section>

        <aside className="sidebar-panel card">
          <p className="page-intro__eyebrow">Browse</p>
          <h2>안내</h2>
          <ul className="simple-list">
            <li>최신 글 기준으로 정렬됩니다.</li>
            <li>백엔드 페이지 응답 구조와 연결되어 있습니다.</li>
            <li>이후 검색과 정렬 조건을 자연스럽게 확장할 수 있습니다.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

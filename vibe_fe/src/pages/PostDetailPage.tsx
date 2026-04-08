import { Link, useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";
import { PageIntro } from "../components/PageIntro";
import { formatDate } from "../utils/formatDate";

export function PostDetailPage() {
  const { postId } = useParams();
  const post = getPostById(postId ?? "");

  if (!post) {
    return (
      <div className="container narrow page-stack">
        <PageIntro
          eyebrow="Posts"
          title="글을 찾을 수 없습니다"
          description="유효하지 않은 글 ID이거나 아직 로딩 로직이 연결되지 않았습니다."
        />
      </div>
    );
  }

  return (
    <div className="container narrow page-stack">
      <article className="detail-article card">
        <div className="detail-article__meta">
          <span>{post.authorName}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="detail-article__summary">{post.summary}</p>
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="detail-article__content">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="form-actions">
          <Link to={`/posts/${post.id}/edit`} className="button primary">
            수정하기
          </Link>
          <Link to="/posts" className="button secondary">
            목록으로
          </Link>
        </div>
      </article>
    </div>
  );
}

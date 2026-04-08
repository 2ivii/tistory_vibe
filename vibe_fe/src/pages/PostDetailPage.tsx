import { Link, useParams } from "react-router-dom";
import { getCommentsByPostId, getPostById } from "../api/postApi";
import { CommentPlaceholder } from "../components/CommentPlaceholder";
import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";
import { formatDate } from "../utils/formatDate";

export function PostDetailPage() {
  const { postId } = useParams();
  const post = getPostById(postId ?? "");
  const comments = getCommentsByPostId(postId ?? "");

  usePageTitle(post ? post.title : "글 상세");

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
        <p className="page-intro__eyebrow">{post.category}</p>
        <div className="detail-article__meta">
          <span>{post.authorDisplayName}</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>{post.readTime}</span>
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
        <div className="detail-article__footer">
          <span>좋아요 {post.likeCount}</span>
          <span>댓글 {post.commentCount}</span>
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
      <CommentPlaceholder comments={comments} />
    </div>
  );
}

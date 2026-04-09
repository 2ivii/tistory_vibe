import { Link } from "react-router-dom";
import type { PostSummary } from "../types/post";
import { formatDate } from "../utils/formatDate";

type PostCardProps = {
  post: PostSummary;
  compact?: boolean;
};

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className={compact ? "post-card post-card--compact" : "post-card"}>
      <div className={`post-card__cover post-card__cover--${post.id}`}>
        <span className="post-card__badge">{compact ? "오늘의 티스토리" : post.authorNickname}</span>
        <div className="post-card__overlay">
          <Link to={`/posts/${post.id}`} className="post-card__title">
            {post.title}
          </Link>
          <div className="post-card__meta">
            <span>{post.authorNickname}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

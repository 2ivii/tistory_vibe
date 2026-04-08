import { Link } from "react-router-dom";
import type { PostSummary } from "../types/post";
import { formatDate } from "../utils/formatDate";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card post-card">
      <div className="post-card__meta">
        <span>{post.authorName}</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <Link to={`/posts/${post.id}`} className="post-card__title">
        {post.title}
      </Link>
      <p className="post-card__excerpt">{post.summary}</p>
      <div className="tag-list">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

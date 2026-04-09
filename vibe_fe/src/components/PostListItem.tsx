import { Link } from "react-router-dom";
import type { PostSummary } from "../types/post";
import { formatDate } from "../utils/formatDate";

type PostListItemProps = {
  post: PostSummary;
  rank?: number;
  showThumbnail?: boolean;
};

export function PostListItem({ post, rank, showThumbnail = false }: PostListItemProps) {
  return (
    <article className="post-list-item">
      {rank ? <div className="post-list-item__rank">{rank}</div> : null}
      <div className="post-list-item__body">
        <div className="post-list-item__meta">
          <span>{post.authorNickname}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <Link to={`/posts/${post.id}`} className="post-list-item__title">
          {post.title}
        </Link>
        <p className="post-list-item__summary">{post.summary}</p>
      </div>
      {showThumbnail ? <div className={`post-list-item__thumb post-list-item__thumb--${post.id}`} /> : null}
    </article>
  );
}

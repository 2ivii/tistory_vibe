import type { CommentPreview } from "../types/comment";
import { formatDate } from "../utils/formatDate";

type CommentPlaceholderProps = {
  comments: CommentPreview[];
};

export function CommentPlaceholder({ comments }: CommentPlaceholderProps) {
  return (
    <section className="comment-panel card">
      <div className="section-heading">
        <h2>댓글</h2>
        <span>{comments.length}개</span>
      </div>
      <div className="comment-form-placeholder">
        <textarea rows={4} placeholder="댓글 기능은 이후 API 연동 단계에서 연결됩니다." />
        <button type="button" className="button primary">
          댓글 등록
        </button>
      </div>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id} className="comment-item">
              <div className="comment-item__meta">
                <strong>{comment.authorName}</strong>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
              <p>{comment.content}</p>
            </article>
          ))
        ) : (
          <div className="comment-empty">
            <p>아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { AuthSession } from "../types/auth";
import type { Comment } from "../types/comment";
import { formatDate } from "../utils/formatDate";

type CommentSectionProps = {
  comments: Comment[];
  session: AuthSession;
  loading: boolean;
  error: string | null;
  submitError: string | null;
  deleteError: string | null;
  isSubmitting: boolean;
  deletingCommentId: number | null;
  onSubmit: (content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
};

export function CommentSection({
  comments,
  session,
  loading,
  error,
  submitError,
  deleteError,
  isSubmitting,
  deletingCommentId,
  onSubmit,
  onDelete
}: CommentSectionProps) {
  const [content, setContent] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return;
    }

    await onSubmit(trimmedContent);
    setContent("");
  }

  async function handleDelete(commentId: number) {
    if (!window.confirm("이 댓글을 삭제할까요?")) {
      return;
    }

    await onDelete(commentId);
  }

  return (
    <section className="comment-panel card">
      <div className="section-heading">
        <h2>댓글</h2>
        <span>{comments.length}개</span>
      </div>

      {session.isLoggedIn ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            rows={4}
            value={content}
            maxLength={1000}
            onChange={(event) => setContent(event.target.value)}
            placeholder="댓글을 입력해 주세요."
            disabled={isSubmitting}
          />
          <div className="comment-form__footer">
            <span className="helper-text">{content.trim().length}/1000</span>
            <button type="submit" className="button primary" disabled={isSubmitting || !content.trim()}>
              {isSubmitting ? "등록 중..." : "댓글 등록"}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-notice">
          <p>댓글 작성은 로그인한 사용자만 가능합니다.</p>
          <Link to="/login" className="button secondary">
            로그인하기
          </Link>
        </div>
      )}

      {submitError ? <p className="helper-text">{submitError}</p> : null}
      {deleteError ? <p className="helper-text">{deleteError}</p> : null}
      {error ? <p className="helper-text">{error}</p> : null}

      <div className="comment-list">
        {loading ? (
          <div className="comment-empty">
            <p>댓글을 불러오는 중입니다.</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id} className="comment-item">
              <div className="comment-item__meta">
                <div className="comment-item__author">
                  <strong>{comment.authorNickname}</strong>
                  <span>@{comment.authorBlogUsername}</span>
                </div>
                <div className="comment-item__actions">
                  <span>{formatDate(comment.createdAt)}</span>
                  {comment.mine ? (
                    <button
                      type="button"
                      className="comment-delete-button"
                      onClick={() => void handleDelete(comment.id)}
                      disabled={deletingCommentId === comment.id}
                    >
                      {deletingCommentId === comment.id ? "삭제 중..." : "삭제"}
                    </button>
                  ) : null}
                </div>
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

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment, deleteComment, getComments } from "../api/comments";
import { deletePost, getPost } from "../api/posts";
import { CommentSection } from "../components/CommentSection";
import { PageIntro } from "../components/PageIntro";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { Comment } from "../types/comment";
import type { PostDetail } from "../types/post";
import { formatDate } from "../utils/formatDate";

export function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const session = useAuthSession();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentSubmitError, setCommentSubmitError] = useState<string | null>(null);
  const [commentDeleteError, setCommentDeleteError] = useState<string | null>(null);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);

  usePageTitle(post ? post.title : "글 상세");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      if (!postId) {
        setError("유효하지 않은 게시글 주소입니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getPost(postId);

        if (active) {
          setPost(response);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      active = false;
    };
  }, [postId]);

  useEffect(() => {
    let active = true;

    async function loadComments() {
      if (!postId) {
        setComments([]);
        setCommentsError("유효하지 않은 게시글 주소입니다.");
        setCommentsLoading(false);
        return;
      }

      try {
        setCommentsLoading(true);
        setCommentsError(null);
        const response = await getComments(postId);

        if (active) {
          setComments(response);
        }
      } catch (loadError) {
        if (active) {
          setCommentsError(loadError instanceof Error ? loadError.message : "댓글을 불러오지 못했습니다.");
        }
      } finally {
        if (active) {
          setCommentsLoading(false);
        }
      }
    }

    void loadComments();

    return () => {
      active = false;
    };
  }, [postId]);

  async function handleDelete() {
    if (!postId) {
      return;
    }

    if (!window.confirm("이 게시글을 삭제할까요?")) {
      return;
    }

    try {
      setDeleteError(null);
      await deletePost(postId);
      navigate("/posts");
    } catch (deletePostError) {
      setDeleteError(deletePostError instanceof Error ? deletePostError.message : "게시글 삭제에 실패했습니다.");
    }
  }

  async function handleCommentSubmit(content: string) {
    if (!postId || !session.isLoggedIn) {
      setCommentSubmitError("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    try {
      setIsCommentSubmitting(true);
      setCommentSubmitError(null);
      setCommentDeleteError(null);
      const createdComment = await createComment(postId, { content });

      setComments((currentComments) => [...currentComments, createdComment]);
      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              commentCount: currentPost.commentCount + 1
            }
          : currentPost
      );
    } catch (submitError) {
      setCommentSubmitError(submitError instanceof Error ? submitError.message : "댓글 작성에 실패했습니다.");
      throw submitError;
    } finally {
      setIsCommentSubmitting(false);
    }
  }

  async function handleCommentDelete(commentId: number) {
    try {
      setDeletingCommentId(commentId);
      setCommentDeleteError(null);
      setCommentSubmitError(null);
      await deleteComment(commentId);

      setComments((currentComments) => currentComments.filter((comment) => comment.id !== commentId));
      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              commentCount: Math.max(0, currentPost.commentCount - 1)
            }
          : currentPost
      );
    } catch (commentDeleteRequestError) {
      setCommentDeleteError(
        commentDeleteRequestError instanceof Error ? commentDeleteRequestError.message : "댓글 삭제에 실패했습니다."
      );
      throw commentDeleteRequestError;
    } finally {
      setDeletingCommentId(null);
    }
  }

  if (loading) {
    return (
      <div className="container narrow page-stack">
        <PageIntro eyebrow="Posts" title="글을 불러오는 중입니다" description="잠시만 기다려 주세요." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container narrow page-stack">
        <PageIntro eyebrow="Posts" title="글을 찾을 수 없습니다" description={error ?? "유효하지 않은 글 ID입니다."} />
      </div>
    );
  }

  return (
    <div className="container narrow page-stack">
      <article className="detail-article card">
        <p className="page-intro__eyebrow">{post.authorBlogUsername}</p>
        <div className="detail-article__meta">
          <span>{post.authorNickname}</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>수정 {formatDate(post.updatedAt)}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="detail-article__summary">{post.summary}</p>
        <div className="detail-article__content">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={`${post.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
        <div className="detail-article__footer">
          <span>좋아요 {post.likeCount}</span>
          <span>댓글 {post.commentCount}</span>
          <span>조회 {post.viewCount}</span>
        </div>
        <div className="form-actions">
          {session.isLoggedIn && post.mine ? (
            <>
              <Link to={`/posts/${post.id}/edit`} className="button primary">
                수정하기
              </Link>
              <button type="button" className="button secondary" onClick={handleDelete}>
                삭제하기
              </button>
            </>
          ) : null}
          <Link to="/posts" className="button secondary">
            목록으로
          </Link>
        </div>
        {deleteError ? <p className="helper-text">{deleteError}</p> : null}
      </article>
      <CommentSection
        comments={comments}
        session={session}
        loading={commentsLoading}
        error={commentsError}
        submitError={commentSubmitError}
        deleteError={commentDeleteError}
        isSubmitting={isCommentSubmitting}
        deletingCommentId={deletingCommentId}
        onSubmit={handleCommentSubmit}
        onDelete={handleCommentDelete}
      />
    </div>
  );
}

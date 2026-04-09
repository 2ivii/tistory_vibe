import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/posts";
import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { PostDetail, PostFormValues } from "../types/post";

export function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const session = useAuthSession();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageTitle("글 수정");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      if (!postId) {
        setError("수정할 게시글을 찾을 수 없습니다.");
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

  async function handleSubmit(values: PostFormValues) {
    if (!postId) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const updatedPost = await updatePost(postId, values);
      navigate(`/posts/${updatedPost.id}`);
    } catch (submitPostError) {
      setSubmitError(submitPostError instanceof Error ? submitPostError.message : "게시글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session.isLoggedIn) {
    return (
      <div className="container page-stack">
        <PageIntro eyebrow="Editor" title="로그인이 필요합니다" description="게시글 수정은 로그인 후 이용할 수 있습니다." />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container page-stack">
        <PageIntro eyebrow="Editor" title="게시글을 불러오는 중입니다" description="잠시만 기다려 주세요." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container page-stack">
        <PageIntro eyebrow="Editor" title="글 수정" description={error ?? "게시글을 찾을 수 없습니다."} />
      </div>
    );
  }

  if (!post.mine) {
    return (
      <div className="container page-stack">
        <PageIntro eyebrow="Editor" title="수정 권한이 없습니다" description="본인 글만 수정할 수 있습니다." />
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <PageIntro eyebrow="Editor" title="글 수정" description={`현재 수정 대상 글 ID는 ${postId ?? "unknown"} 입니다.`} />
      <PostEditorForm
        mode="edit"
        initialValues={{
          title: post.title,
          summary: post.summary,
          content: post.content
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}

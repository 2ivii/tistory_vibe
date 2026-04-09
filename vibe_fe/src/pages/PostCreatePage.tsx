import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { PostFormValues } from "../types/post";

export function PostCreatePage() {
  const navigate = useNavigate();
  const session = useAuthSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  usePageTitle("글 작성");

  async function handleSubmit(values: PostFormValues) {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const createdPost = await createPost(values);
      navigate(`/posts/${createdPost.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "게시글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session.isLoggedIn) {
    return (
      <div className="container page-stack">
        <PageIntro
          eyebrow="Editor"
          title="로그인이 필요합니다"
          description="게시글 작성은 로그인한 사용자만 가능합니다. 먼저 로그인한 뒤 다시 시도해 주세요."
        />
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Editor"
        title="글 작성"
        description="블로그 에디터는 입력 흐름이 끊기지 않도록 좌측 본문, 우측 설정 패널 구조로 구성했습니다."
      />
      <PostEditorForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} />
    </div>
  );
}

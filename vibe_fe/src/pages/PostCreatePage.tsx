import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";
import { usePageTitle } from "../hooks/usePageTitle";

export function PostCreatePage() {
  usePageTitle("글 작성");

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Editor"
        title="글 작성"
        description="블로그 에디터는 입력 흐름이 끊기지 않도록 좌측 본문, 우측 설정 패널 구조로 구성했습니다."
      />
      <PostEditorForm mode="create" />
    </div>
  );
}

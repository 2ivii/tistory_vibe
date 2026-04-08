import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";

export function PostCreatePage() {
  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Editor"
        title="글 작성"
        description="에디터, 임시 저장, 이미지 업로드 기능이 추후 연결될 수 있도록 독립된 작성 화면을 둡니다."
      />
      <PostEditorForm mode="create" />
    </div>
  );
}

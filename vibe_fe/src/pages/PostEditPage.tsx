import { useParams } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";
import { usePageTitle } from "../hooks/usePageTitle";

export function PostEditPage() {
  const { postId } = useParams();
  usePageTitle("글 수정");

  return (
    <div className="container page-stack">
      <PageIntro
        eyebrow="Editor"
        title="글 수정"
        description={`현재 수정 대상 글 ID는 ${postId ?? "unknown"} 입니다. 이후 상세 조회 API와 연결하면 동일한 에디터 폼에 초기값만 주입하면 됩니다.`}
      />
      <PostEditorForm mode="edit" />
    </div>
  );
}

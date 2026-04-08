import { useParams } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { PostEditorForm } from "../components/PostEditorForm";

export function PostEditPage() {
  const { postId } = useParams();

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Editor"
        title="글 수정"
        description={`현재 수정 대상 글 ID는 ${postId ?? "unknown"} 입니다. 이후 상세 조회 API와 연결해 초기값을 채우면 됩니다.`}
      />
      <PostEditorForm mode="edit" />
    </div>
  );
}

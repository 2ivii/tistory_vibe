import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("404");

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="404"
        title="페이지를 찾을 수 없습니다"
        description="라우팅 구조는 연결되어 있지만, 현재 주소에 해당하는 화면은 없습니다."
      />
      <Link to="/" className="button primary">
        홈으로 이동
      </Link>
    </div>
  );
}

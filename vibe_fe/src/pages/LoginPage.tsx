import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";

export function LoginPage() {
  usePageTitle("로그인");

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="로그인"
        description="이후 JWT 로그인 API와 바로 연결할 수 있도록 단순하고 분리된 인증 화면 구조를 사용합니다."
      />

      <div className="auth-layout">
        <section className="card auth-card">
          <form className="form-grid">
            <label className="form-field">
              <span>이메일</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label className="form-field">
              <span>비밀번호</span>
              <input type="password" placeholder="비밀번호를 입력하세요" />
            </label>
            <button type="button" className="button primary">
              로그인
            </button>
          </form>
          <p className="helper-text">
            계정이 없다면 <Link to="/signup">회원가입</Link>으로 이동하세요.
          </p>
        </section>

        <aside className="card auth-side-card">
          <p className="page-intro__eyebrow">Welcome Back</p>
          <h2>기록을 다시 이어가세요</h2>
          <p>작성 중인 글, 개인 블로그, 댓글 흐름까지 이후 로그인 상태와 자연스럽게 연결될 수 있도록 준비된 화면입니다.</p>
        </aside>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";

export function LoginPage() {
  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="로그인"
        description="현재는 화면 뼈대만 제공하며, 이후 Spring Security 또는 JWT 기반 인증 흐름과 연결할 수 있습니다."
      />

      <section className="card">
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
    </div>
  );
}

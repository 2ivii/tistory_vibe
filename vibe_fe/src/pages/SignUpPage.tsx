import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";

export function SignUpPage() {
  usePageTitle("회원가입");

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="회원가입"
        description="회원가입 이후 블로그 주소와 프로필 설정으로 확장할 수 있도록 필드를 분리하기 쉬운 구조로 잡았습니다."
      />

      <div className="auth-layout">
        <section className="card auth-card">
          <form className="form-grid">
            <label className="form-field">
              <span>닉네임</span>
              <input type="text" placeholder="사용할 닉네임" />
            </label>
            <label className="form-field">
              <span>블로그 주소</span>
              <input type="text" placeholder="my-vibe-blog" />
            </label>
            <label className="form-field">
              <span>이메일</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label className="form-field">
              <span>비밀번호</span>
              <input type="password" placeholder="비밀번호를 입력하세요" />
            </label>
            <button type="button" className="button primary">
              회원가입
            </button>
          </form>
        </section>

        <aside className="card auth-side-card">
          <p className="page-intro__eyebrow">Start Your Blog</p>
          <h2>첫 기록을 남길 준비</h2>
          <p>이 화면은 이후 중복 검사, 비밀번호 검증, 프로필 설정 API를 순차적으로 붙이기 쉽도록 단순한 폼 구조를 유지합니다.</p>
        </aside>
      </div>
    </div>
  );
}

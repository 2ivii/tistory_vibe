import { PageIntro } from "../components/PageIntro";

export function SignUpPage() {
  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="회원가입"
        description="가입 폼은 최소한으로 두고, 추후 유효성 검사와 백엔드 연동을 분리하기 쉽게 구성합니다."
      />

      <section className="card">
        <form className="form-grid">
          <label className="form-field">
            <span>닉네임</span>
            <input type="text" placeholder="사용할 닉네임" />
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
    </div>
  );
}

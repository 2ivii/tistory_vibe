import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyInfo, login } from "../api/authApi";
import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageTitle("로그인");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      await login({ email, password });
      const me = await fetchMyInfo();
      navigate(`/blog/${me.blogUsername}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="로그인"
        description="JWT 로그인 API와 연결된 화면입니다. 로그인 후 작성, 수정, 삭제 권한이 활성화됩니다."
      />

      <div className="auth-layout">
        <section className="card auth-card">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>이메일</span>
              <input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="form-field">
              <span>비밀번호</span>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error ? <p className="helper-text">{error}</p> : null}
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>
          <p className="helper-text">
            계정이 없다면 <Link to="/signup">회원가입</Link>으로 이동하세요.
          </p>
        </section>

        <aside className="card auth-side-card">
          <p className="page-intro__eyebrow">Welcome Back</p>
          <h2>기록을 다시 이어가세요</h2>
          <p>작성 중인 글, 개인 블로그, 댓글 흐름까지 로그인 상태와 자연스럽게 연결됩니다.</p>
        </aside>
      </div>
    </div>
  );
}

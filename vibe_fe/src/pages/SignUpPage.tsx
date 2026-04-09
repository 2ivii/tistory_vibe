import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/authApi";
import { PageIntro } from "../components/PageIntro";
import { usePageTitle } from "../hooks/usePageTitle";

export function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    blogUsername: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageTitle("회원가입");

  function updateField(key: "nickname" | "blogUsername" | "email" | "password", value: string) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      await signUp(form);
      navigate("/login");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container narrow page-stack">
      <PageIntro
        eyebrow="Auth"
        title="회원가입"
        description="회원가입 후 로그인해서 게시글 작성과 수정 흐름으로 자연스럽게 이어집니다."
      />

      <div className="auth-layout">
        <section className="card auth-card">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>닉네임</span>
              <input type="text" placeholder="사용할 닉네임" value={form.nickname} onChange={(event) => updateField("nickname", event.target.value)} />
            </label>
            <label className="form-field">
              <span>블로그 주소</span>
              <input
                type="text"
                placeholder="my-vibe-blog"
                value={form.blogUsername}
                onChange={(event) => updateField("blogUsername", event.target.value)}
              />
            </label>
            <label className="form-field">
              <span>이메일</span>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
            <label className="form-field">
              <span>비밀번호</span>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
              />
            </label>
            {error ? <p className="helper-text">{error}</p> : null}
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? "가입 중..." : "회원가입"}
            </button>
          </form>
        </section>

        <aside className="card auth-side-card">
          <p className="page-intro__eyebrow">Start Your Blog</p>
          <h2>첫 기록을 남길 준비</h2>
          <p>회원가입 이후 로그인하면 글 작성과 수정 기능이 활성화됩니다.</p>
        </aside>
      </div>
    </div>
  );
}

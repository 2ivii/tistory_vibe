import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { PostFormValues } from "../types/post";

type PostEditorFormProps = {
  mode: "create" | "edit";
  initialValues?: PostFormValues;
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
};

const defaultValues: PostFormValues = {
  title: "",
  summary: "",
  content: ""
};

export function PostEditorForm({
  mode,
  initialValues = defaultValues,
  isSubmitting = false,
  submitError = null,
  onSubmit
}: PostEditorFormProps) {
  const title = mode === "create" ? "새 글 작성" : "글 수정";
  const actionLabel = mode === "create" ? "게시글 등록" : "수정 완료";
  const [values, setValues] = useState<PostFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function updateField<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);
  }

  return (
    <section className="editor-layout">
      <div className="editor-main card editor-form">
        <div className="editor-heading">
          <p className="page-intro__eyebrow">Editor</p>
          <h2>{title}</h2>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>제목</span>
            <input
              type="text"
              placeholder="독자의 시선을 끌 제목을 입력하세요"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </label>
          {submitError ? <p className="helper-text">{submitError}</p> : null}
          <label className="form-field">
            <span>본문</span>
            <textarea
              rows={18}
              placeholder="지금은 단순 textarea이지만, 이후 마크다운 또는 리치 텍스트 에디터로 교체하기 쉽게 분리된 영역입니다."
              value={values.content}
              onChange={(event) => updateField("content", event.target.value)}
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? "처리 중..." : actionLabel}
            </button>
            <button type="button" className="button secondary">
              미리보기
            </button>
          </div>
        </form>
      </div>

      <aside className="editor-sidebar card">
        <h3>작성 설정</h3>
        <label className="form-field">
          <span>요약</span>
          <input
            type="text"
            placeholder="목록 화면에 보일 짧은 소개"
            value={values.summary}
            onChange={(event) => updateField("summary", event.target.value)}
          />
        </label>
      </aside>
    </section>
  );
}

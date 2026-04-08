type PostEditorFormProps = {
  mode: "create" | "edit";
};

export function PostEditorForm({ mode }: PostEditorFormProps) {
  const title = mode === "create" ? "새 글 작성" : "글 수정";
  const actionLabel = mode === "create" ? "임시 저장" : "수정 사항 저장";

  return (
    <section className="card editor-form">
      <h2>{title}</h2>
      <form className="form-grid">
        <label className="form-field">
          <span>제목</span>
          <input type="text" placeholder="글 제목을 입력하세요" />
        </label>
        <label className="form-field">
          <span>태그</span>
          <input type="text" placeholder="react, frontend, blog" />
        </label>
        <label className="form-field">
          <span>요약</span>
          <input type="text" placeholder="목록 화면에 보여줄 한 줄 요약" />
        </label>
        <label className="form-field">
          <span>본문</span>
          <textarea rows={12} placeholder="추후 에디터 컴포넌트로 교체할 수 있는 영역" />
        </label>
        <div className="form-actions">
          <button type="button" className="button primary">
            {actionLabel}
          </button>
          <button type="button" className="button secondary">
            미리보기
          </button>
        </div>
      </form>
    </section>
  );
}

type PostEditorFormProps = {
  mode: "create" | "edit";
};

export function PostEditorForm({ mode }: PostEditorFormProps) {
  const title = mode === "create" ? "새 글 작성" : "글 수정";
  const actionLabel = mode === "create" ? "게시글 등록" : "수정 완료";

  return (
    <section className="editor-layout">
      <div className="editor-main card editor-form">
        <div className="editor-heading">
          <p className="page-intro__eyebrow">Editor</p>
          <h2>{title}</h2>
        </div>
        <form className="form-grid">
          <label className="form-field">
            <span>제목</span>
            <input type="text" placeholder="독자의 시선을 끌 제목을 입력하세요" />
          </label>
          <label className="form-field">
            <span>본문</span>
            <textarea rows={18} placeholder="지금은 단순 textarea이지만, 이후 마크다운 또는 리치 텍스트 에디터로 교체하기 쉽게 분리된 영역입니다." />
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
      </div>

      <aside className="editor-sidebar card">
        <h3>작성 설정</h3>
        <label className="form-field">
          <span>요약</span>
          <input type="text" placeholder="목록 화면에 보일 짧은 소개" />
        </label>
        <label className="form-field">
          <span>태그</span>
          <input type="text" placeholder="react, spring, diary" />
        </label>
        <label className="form-field">
          <span>공개 설정</span>
          <select className="form-select" defaultValue="public">
            <option value="public">전체 공개</option>
            <option value="private">비공개</option>
          </select>
        </label>
      </aside>
    </section>
  );
}

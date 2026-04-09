import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccountManagement, updatePrimaryBlog } from "../api/accountApi";
import { useAuthSession } from "../hooks/useAuthSession";
import { usePageTitle } from "../hooks/usePageTitle";
import type { AccountBlogSummary, AccountManagement } from "../types/account";

const accountMenuGroups = [
  {
    title: "블로그",
    items: ["내 블로그", "블로그 관리", "대표 블로그"]
  },
  {
    title: "계정",
    items: ["내 계정", "보안 설정", "프로필 정보"]
  },
  {
    title: "외부 기능",
    items: ["연동 서비스", "알림 및 활용", "실험실"]
  }
];

export function AccountPage() {
  usePageTitle("계정관리");

  const navigate = useNavigate();
  const session = useAuthSession();
  const [account, setAccount] = useState<AccountManagement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingPrimaryBlog, setUpdatingPrimaryBlog] = useState<string | null>(null);

  useEffect(() => {
    if (!session.isLoggedIn) {
      navigate("/login");
      return;
    }

    let active = true;

    async function loadAccountManagement() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAccountManagement();

        if (active) {
          setAccount(response);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "계정관리 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadAccountManagement();

    return () => {
      active = false;
    };
  }, [navigate, session.isLoggedIn]);

  async function handleChangePrimaryBlog(blogUsername: string) {
    try {
      setUpdatingPrimaryBlog(blogUsername);
      setError(null);
      const response = await updatePrimaryBlog({ blogUsername });
      setAccount(response);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "대표 블로그를 변경하지 못했습니다.");
    } finally {
      setUpdatingPrimaryBlog(null);
    }
  }

  const userInfo = account?.userInfo;
  const avatarText = userInfo?.nickname.slice(0, 1) ?? session.user?.nickname.slice(0, 1) ?? "나";

  return (
    <div className="container page-stack">
      <section className="account-shell">
        <aside className="account-sidebar">
          <section className="card account-profile-card">
            <div className="account-profile-card__avatar">
              {userInfo?.profileImageUrl ? (
                <img src={userInfo.profileImageUrl} alt={`${userInfo.nickname} 프로필`} className="account-profile-card__image" />
              ) : (
                <span>{avatarText}</span>
              )}
            </div>
            <div className="account-profile-card__body">
              <p className="page-intro__eyebrow">Account</p>
              <h1>{userInfo?.nickname ?? "내 계정"}</h1>
              <p>{userInfo?.email ?? session.user?.email}</p>
            </div>
            <Link to={session.user ? `/blog/${session.user.blogUsername}` : "/"} className="button ghost account-profile-card__link">
              내 블로그 바로가기
            </Link>
          </section>

          <section className="card account-nav-card">
            {accountMenuGroups.map((group) => (
              <div key={group.title} className="account-nav-card__group">
                <strong>{group.title}</strong>
                <div className="account-nav-card__items">
                  {group.items.map((item) => (
                    <button key={item} type="button" className={`account-nav-card__item${item === "내 블로그" ? " active" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </aside>

        <section className="account-main">
          <section className="card account-panel">
            <div className="section-heading">
              <h2>계정 요약</h2>
              {account?.primaryBlog ? <span>@{account.primaryBlog.blogUsername}</span> : null}
            </div>
            {loading ? <p className="helper-text">계정관리 정보를 불러오는 중입니다.</p> : null}
            {error ? <p className="helper-text">{error}</p> : null}
            {!loading && account ? (
              <div className="account-summary-grid">
                <div className="account-summary-card">
                  <span>대표 블로그</span>
                  <strong>{account.primaryBlog.blogTitle}</strong>
                  <p>@{account.primaryBlog.blogUsername}</p>
                </div>
                <div className="account-summary-card">
                  <span>운영 중인 블로그</span>
                  <strong>{account.ownedBlogs.length}개</strong>
                  <p>현재 프로젝트 기준으로 1개 블로그 구조입니다.</p>
                </div>
                <div className="account-summary-card">
                  <span>참여 중인 블로그</span>
                  <strong>{account.participatingBlogs.length}개</strong>
                  <p>향후 다중 블로그 구조로 확장 가능합니다.</p>
                </div>
              </div>
            ) : null}
          </section>

          <section className="card account-panel">
            <div className="section-heading">
              <h2>운영 중인 블로그</h2>
              <span>{account?.ownedBlogs.length ?? 0}개</span>
            </div>
            {!loading && account ? (
              <div className="account-blog-list">
                {account.ownedBlogs.map((blog) => (
                  <BlogRow
                    key={`owned-${blog.blogUsername}`}
                    blog={blog}
                    actionLabel={blog.primary ? "대표 블로그" : "대표로 설정"}
                    onAction={blog.primary ? undefined : () => handleChangePrimaryBlog(blog.blogUsername)}
                    loading={updatingPrimaryBlog === blog.blogUsername}
                  />
                ))}
              </div>
            ) : null}
          </section>

          <section className="card account-panel">
            <div className="section-heading">
              <h2>참여 중인 블로그</h2>
              <span>{account?.participatingBlogs.length ?? 0}개</span>
            </div>
            {!loading && account ? (
              account.participatingBlogs.length > 0 ? (
                <div className="account-blog-list">
                  {account.participatingBlogs.map((blog) => (
                    <BlogRow key={`participating-${blog.blogUsername}`} blog={blog} />
                  ))}
                </div>
              ) : (
                <p className="helper-text">아직 참여 중인 블로그가 없습니다.</p>
              )
            ) : null}
          </section>

          <section className="card account-panel">
            <div className="section-heading">
              <h2>계정 정보</h2>
              <span>기본 프로필</span>
            </div>
            {!loading && account ? (
              <dl className="account-info-list">
                <div>
                  <dt>닉네임</dt>
                  <dd>{account.userInfo.nickname}</dd>
                </div>
                <div>
                  <dt>이메일</dt>
                  <dd>{account.userInfo.email}</dd>
                </div>
                <div>
                  <dt>대표 블로그</dt>
                  <dd>{account.primaryBlog.blogTitle}</dd>
                </div>
              </dl>
            ) : null}
          </section>
        </section>
      </section>
    </div>
  );
}

type BlogRowProps = {
  blog: AccountBlogSummary;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

function BlogRow({ blog, actionLabel, onAction, loading = false }: BlogRowProps) {
  return (
    <div className="account-blog-row">
      <div>
        <strong>{blog.blogTitle}</strong>
        <p>
          @{blog.blogUsername} · {blog.role === "OWNER" ? "운영 중" : "참여 중"}
        </p>
      </div>
      {actionLabel ? (
        <button type="button" className={`button ${blog.primary ? "secondary" : "ghost"}`} onClick={onAction} disabled={loading || blog.primary}>
          {loading ? "변경 중..." : actionLabel}
        </button>
      ) : null}
    </div>
  );
}

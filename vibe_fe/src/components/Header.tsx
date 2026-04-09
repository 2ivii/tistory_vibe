import { NavLink, Link } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAuthSession } from "../hooks/useAuthSession";

const navItems = [
  { to: "/", label: "홈", end: true },
  { to: "/posts", label: "피드" },
  { to: "/blog/minlog", label: "스킨" },
  { to: "/posts/new", label: "글쓰기" },
];

export function Header() {
  const session = useAuthSession();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-brand-group">
          <NavLink to="/" className="brand">
            <span className="brand__wordmark">tistory</span>
          </NavLink>
          <nav className="main-nav" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <label className="header-search" aria-label="검색">
            <input type="search" placeholder="검색어 입력" />
          </label>
          <div className="header-notice">
            <span className="header-notice__icon" />
            <span>댓글 자동요약·유사한 문구 댓글 규제 정책 도입 안내</span>
          </div>
          {session.isLoggedIn ? (
            <div className="user-menu">
              <Link to={`/blog/${session.user?.blogUsername ?? ""}`} className="user-menu__profile">
                <span>{session.user?.nickname ?? "내 블로그"}</span>
              </Link>
              <button type="button" className="button secondary" onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/login" className="button primary header-start-button">
                시작하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

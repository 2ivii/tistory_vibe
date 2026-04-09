import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAuthSession } from "../hooks/useAuthSession";

const publicNavItems = [
  { to: "/", label: "홈", end: true },
  { to: "/posts", label: "피드" },
  { to: "/blog/minlog", label: "스킨" },
];

export function Header() {
  const navigate = useNavigate();
  const session = useAuthSession();
  const blogUsername = session.user?.blogUsername ?? "";
  const nickname = session.user?.nickname ?? "사용자";
  const navItems = session.isLoggedIn
    ? [...publicNavItems, { to: "/posts/new", label: "글쓰기" }]
    : publicNavItems;

  function handleLogout() {
    logout();
    navigate("/");
  }

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
              <Link to={`/blog/${blogUsername}`} className="user-menu__profile">
                <span className="user-menu__avatar">{nickname.slice(0, 1)}</span>
                <span className="user-menu__text">
                  <strong>{nickname}</strong>
                  <small>@{blogUsername}</small>
                </span>
              </Link>
              <Link to={`/blog/${blogUsername}`} className="button ghost">
                내 블로그
              </Link>
              <Link to="/posts/new" className="button primary">
                글쓰기
              </Link>
              <button type="button" className="button secondary" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/signup" className="button ghost">
                회원가입
              </Link>
              <Link to="/login" className="button primary header-start-button">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

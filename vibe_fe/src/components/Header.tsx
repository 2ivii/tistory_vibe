import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAuthSession } from "../hooks/useAuthSession";

const publicNavItems = [
  { to: "/", label: "홈", end: true },
  { to: "/posts", label: "피드" },
  { to: "/blog/minlog", label: "스킨" },
  { to: "/posts", label: "포럼" }
];

export function Header() {
  const navigate = useNavigate();
  const session = useAuthSession();
  const blogUsername = session.user?.blogUsername ?? session.user?.primaryBlogUsername ?? "";
  const myBlogPath = blogUsername ? `/blog/${blogUsername}` : "/";
  const nickname = session.user?.nickname ?? "사용자";
  const email = session.user?.email ?? "";
  const avatarText = nickname.slice(0, 1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleLogout() {
    setIsMenuOpen(false);
    logout();
    navigate("/");
  }

  function handleGoToMyBlog() {
    setIsMenuOpen(false);
    navigate(myBlogPath);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-brand-group">
          <NavLink to="/" className="brand">
            <span className="brand__wordmark">tistory</span>
          </NavLink>
          <nav className="main-nav" aria-label="주요 메뉴">
            {publicNavItems.map((item) => (
              <NavLink
                key={`${item.label}-${item.to}`}
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
            <span className="header-search__icon" aria-hidden="true">
              ⌕
            </span>
          </label>
          <div className="header-notice">
            <span className="header-notice__icon" />
            <span>댓글 자동요약·유사한 문구 댓글 규제 정책 도입 안내</span>
          </div>
          {session.isLoggedIn ? (
            <div className="user-menu user-menu--logged-in">
              <button type="button" className="header-icon-button" aria-label="알림">
                🔔
              </button>
              <div className="profile-menu" ref={menuRef}>
                <button
                  type="button"
                  className="user-menu__profile"
                  aria-label={`${nickname} 프로필 메뉴`}
                  aria-haspopup="menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((current) => !current)}
                >
                  <span className="user-menu__avatar">{avatarText}</span>
                </button>
                {isMenuOpen ? (
                  <div className="profile-dropdown" role="menu" aria-label="사용자 메뉴">
                    <div className="profile-dropdown__account">
                      <strong>{nickname}</strong>
                      <p>{email || `@${blogUsername}`}</p>
                      <Link to="/account" className="profile-dropdown__manage" onClick={() => setIsMenuOpen(false)}>
                        계정관리
                      </Link>
                    </div>
                    <div className="profile-dropdown__menu">
                      <button
                        type="button"
                        className="profile-dropdown__item profile-dropdown__item--button"
                        role="menuitem"
                        onClick={handleGoToMyBlog}
                      >
                        내 블로그
                      </button>
                      <Link to="/posts/new" className="profile-dropdown__item" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                        글쓰기
                      </Link>
                      <button type="button" className="profile-dropdown__item profile-dropdown__item--button" role="menuitem" onClick={handleLogout}>
                        로그아웃
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="header-auth-actions">
              <Link to="/signup" className="header-auth-link">
                  회원가입
              </Link>
              <Link to="/login" className="header-auth-link header-auth-link--primary">
                  로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈", end: true },
  { to: "/posts", label: "글 목록" },
  { to: "/posts/new", label: "글 작성" },
  { to: "/blog/tistory-vibe", label: "내 블로그" },
  { to: "/login", label: "로그인" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          Tistory Vibe
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
    </header>
  );
}

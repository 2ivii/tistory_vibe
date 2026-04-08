import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PostCreatePage } from "../pages/PostCreatePage";
import { PostDetailPage } from "../pages/PostDetailPage";
import { PostEditPage } from "../pages/PostEditPage";
import { PostListPage } from "../pages/PostListPage";
import { SignUpPage } from "../pages/SignUpPage";
import { UserBlogPage } from "../pages/UserBlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "posts", element: <PostListPage /> },
      { path: "posts/new", element: <PostCreatePage /> },
      { path: "posts/:postId", element: <PostDetailPage /> },
      { path: "posts/:postId/edit", element: <PostEditPage /> },
      { path: "blog/:username", element: <UserBlogPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

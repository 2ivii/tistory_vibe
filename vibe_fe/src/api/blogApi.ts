import type { CurrentUser } from "../types/auth";
import type { BlogProfile } from "../types/blog";

const profiles: BlogProfile[] = [
  {
    username: "minlog",
    displayName: "민로그",
    blogTitle: "민로그의 프론트엔드 노트",
    bio: "React, Spring Boot, 그리고 서비스 설계를 공부하며 기록합니다.",
    postCount: 3,
    isOwner: false
  },
  {
    username: "backendlab",
    displayName: "백엔드랩",
    blogTitle: "백엔드랩",
    bio: "API 설계와 데이터 모델링을 정리하는 개인 개발 블로그입니다.",
    postCount: 1,
    isOwner: false
  }
];

export function buildMyBlogProfile(user: CurrentUser, postCount = 0): BlogProfile {
  return {
    username: user.blogUsername,
    displayName: user.nickname,
    blogTitle: user.blogTitle,
    bio: user.bio,
    postCount,
    isOwner: true
  };
}

export function getBlogProfile(username: string, postCount = 0): BlogProfile | undefined {
  const profile = profiles.find((item) => item.username === username);

  if (!profile) {
    return undefined;
  }

  return {
    ...profile,
    postCount
  };
}

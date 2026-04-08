import type { BlogProfile } from "../types/blog";

const profiles: BlogProfile[] = [
  {
    username: "minlog",
    displayName: "민로그",
    blogTitle: "민로그의 프론트엔드 노트",
    bio: "React, Spring Boot, 그리고 서비스 설계를 공부하며 기록합니다.",
    followerCount: 128,
    postCount: 3,
    todayVisitorCount: 42
  },
  {
    username: "backendlab",
    displayName: "백엔드랩",
    blogTitle: "백엔드랩",
    bio: "API 설계와 데이터 모델링을 정리하는 개인 개발 블로그입니다.",
    followerCount: 76,
    postCount: 1,
    todayVisitorCount: 17
  }
];

export function getBlogProfile(username: string): BlogProfile | undefined {
  return profiles.find((profile) => profile.username === username);
}

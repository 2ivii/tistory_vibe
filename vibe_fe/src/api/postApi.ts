import type { PostDetail, PostSummary } from "../types/post";

const posts: PostDetail[] = [
  {
    id: "1",
    title: "React + Vite로 시작하는 블로그 플랫폼 설계",
    summary: "프로젝트 초기에 라우팅과 레이아웃을 어떻게 분리할지 정리합니다.",
    content: [
      "초기 구조는 기능보다 확장성을 먼저 고려해야 합니다.",
      "pages, layouts, api, types를 분리하면 백엔드 연동 시 책임이 명확해집니다.",
      "현재 데이터는 더미이지만, 이후 fetch 기반 API 함수로 자연스럽게 교체할 수 있습니다."
    ],
    tags: ["react", "vite", "architecture"],
    authorName: "tistory-vibe",
    createdAt: "2026-04-09T00:00:00.000Z",
    featured: true
  },
  {
    id: "2",
    title: "블로그 메인 화면에서 필요한 최소 컴포넌트",
    summary: "헤더, 소개 영역, 추천 글 섹션만으로도 첫 화면의 방향성을 잡을 수 있습니다.",
    content: [
      "메인 화면은 서비스 정체성을 보여주는 공간입니다.",
      "과한 기능을 넣기보다 사용자 흐름이 보이는 골격을 먼저 두는 편이 유지보수에 유리합니다."
    ],
    tags: ["ui", "homepage"],
    authorName: "tistory-vibe",
    createdAt: "2026-04-08T00:00:00.000Z",
    featured: true
  },
  {
    id: "3",
    title: "Spring Boot REST API 연동을 위한 프론트 구조 메모",
    summary: "API 계층을 분리해 두면 백엔드 통신 코드와 화면 코드를 섞지 않을 수 있습니다.",
    content: [
      "api 디렉토리에는 endpoint 호출 함수를 둡니다.",
      "types 디렉토리에는 요청, 응답, 도메인 타입을 둡니다.",
      "화면에서는 API 구현 세부사항보다 데이터를 어떻게 표현할지에 집중할 수 있습니다."
    ],
    tags: ["spring", "rest-api", "frontend"],
    authorName: "backend-ready",
    createdAt: "2026-04-07T00:00:00.000Z",
    featured: false
  }
];

export function getPosts(): PostSummary[] {
  return posts;
}

export function getFeaturedPosts(): PostSummary[] {
  return posts.filter((post) => post.featured);
}

export function getPostById(postId: string): PostDetail | undefined {
  return posts.find((post) => post.id === postId);
}

export function getPostsByUsername(username: string): PostSummary[] {
  return posts.filter((post) => post.authorName === username);
}

import type { CommentPreview } from "../types/comment";
import type { PostDetail, PostSummary } from "../types/post";

const posts: PostDetail[] = [
  {
    id: "1",
    title: "블로그 첫 화면은 정보보다 분위기를 먼저 전달해야 한다",
    summary: "메인 페이지가 단순한 카드 모음이 아니라 서비스의 결을 보여주는 입구가 되도록 구성하는 방법을 정리합니다.",
    content: [
      "블로그 서비스의 첫 화면은 단순히 글을 나열하는 장소가 아닙니다. 사용자가 어떤 글을 만날지, 어떤 분위기의 기록이 쌓일지 감각적으로 이해하게 만드는 공간이기도 합니다.",
      "그래서 초기 프론트엔드 단계에서는 기능을 무리하게 넣기보다, 카드 간 간격, 타이포그래피, 카피 문구, 여백처럼 읽는 흐름을 만드는 요소에 집중하는 편이 좋습니다.",
      "이 프로젝트에서도 메인 화면은 최신 글과 인기 글, 작성 흐름으로 자연스럽게 이어지는 구조를 기준으로 설계했습니다."
    ],
    tags: ["ui", "homepage", "design"],
    authorName: "minlog",
    authorDisplayName: "민로그",
    createdAt: "2026-04-09T09:00:00.000Z",
    featured: true,
    category: "프론트엔드",
    readTime: "4분",
    likeCount: 18,
    commentCount: 4
  },
  {
    id: "2",
    title: "React Router 기준으로 블로그 페이지 흐름을 나누는 방법",
    summary: "메인, 목록, 상세, 작성, 사용자 블로그를 라우트 단위로 나누면 유지보수가 쉬워집니다.",
    content: [
      "페이지 단위를 먼저 잘게 쪼개 두면, 나중에 API가 붙을 때 화면의 책임이 섞이지 않습니다.",
      "특히 블로그 서비스는 목록형 화면과 콘텐츠형 화면의 성격이 다르기 때문에, 동일한 카드 컴포넌트를 재사용하더라도 레이아웃은 별도로 관리하는 편이 안정적입니다."
    ],
    tags: ["react-router", "architecture"],
    authorName: "minlog",
    authorDisplayName: "민로그",
    createdAt: "2026-04-08T08:30:00.000Z",
    featured: true,
    category: "React",
    readTime: "6분",
    likeCount: 12,
    commentCount: 3
  },
  {
    id: "3",
    title: "Spring Boot 백엔드 연동 전에 프론트 구조를 먼저 잡는 이유",
    summary: "API가 없어도 화면 구조를 먼저 잡아두면 DTO와 응답 형태를 설계하기가 쉬워집니다.",
    content: [
      "프론트엔드와 백엔드를 같이 진행할 때 가장 흔한 문제는 데이터 구조와 화면 구조가 동시에 흔들리는 것입니다.",
      "더미 데이터로 화면을 먼저 완성하면 이후 필요한 응답 필드가 무엇인지 명확해지고, 백엔드 DTO 설계도 훨씬 단순해집니다."
    ],
    tags: ["spring-boot", "api", "planning"],
    authorName: "backendlab",
    authorDisplayName: "백엔드랩",
    createdAt: "2026-04-07T14:10:00.000Z",
    featured: false,
    category: "백엔드",
    readTime: "5분",
    likeCount: 9,
    commentCount: 2
  },
  {
    id: "4",
    title: "글 목록 페이지는 카드보다 읽기 흐름이 중요하다",
    summary: "리스트 화면에서는 카드의 장식보다 제목과 요약, 메타 정보가 얼마나 잘 읽히는지가 더 중요합니다.",
    content: [
      "글 목록 화면은 탐색의 중심이기 때문에 한눈에 많은 정보를 보이되 피로하지 않아야 합니다.",
      "그래서 목록 페이지는 카드형보다 행 기반 레이아웃이 더 잘 맞는 경우가 많습니다."
    ],
    tags: ["ux", "list"],
    authorName: "minlog",
    authorDisplayName: "민로그",
    createdAt: "2026-04-06T11:20:00.000Z",
    featured: false,
    category: "UX",
    readTime: "3분",
    likeCount: 7,
    commentCount: 1
  }
];

const commentsByPostId: Record<string, CommentPreview[]> = {
  "1": [
    {
      id: "c1",
      authorName: "frontend-study",
      content: "카드보다 전체 분위기를 먼저 잡는다는 설명이 좋았습니다.",
      createdAt: "2026-04-09T10:20:00.000Z"
    },
    {
      id: "c2",
      authorName: "ui-notes",
      content: "메인 화면 카피와 구조를 동시에 설계하는 방식이 인상적이네요.",
      createdAt: "2026-04-09T11:05:00.000Z"
    }
  ],
  "2": [
    {
      id: "c3",
      authorName: "react-user",
      content: "라우터 기준으로 페이지 책임을 나누는 부분이 도움이 됐어요.",
      createdAt: "2026-04-08T12:00:00.000Z"
    }
  ]
};

export function getPosts(): PostSummary[] {
  return posts;
}

export function getLatestPosts(): PostSummary[] {
  return [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getFeaturedPosts(): PostSummary[] {
  return posts.filter((post) => post.featured);
}

export function getPopularPosts(): PostSummary[] {
  return [...posts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
}

export function getPostById(postId: string): PostDetail | undefined {
  return posts.find((post) => post.id === postId);
}

export function getPostsByUsername(username: string): PostSummary[] {
  return posts.filter((post) => post.authorName === username);
}

export function getCommentsByPostId(postId: string): CommentPreview[] {
  return commentsByPostId[postId] ?? [];
}

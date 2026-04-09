export type PostSummary = {
  id: number;
  title: string;
  summary: string;
  authorNickname: string;
  authorBlogUsername: string;
  createdAt: string;
  updatedAt: string;
};

export type PostDetail = {
  id: number;
  title: string;
  summary: string;
  content: string;
  authorNickname: string;
  authorBlogUsername: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  mine: boolean;
};

export type PostFormValues = {
  title: string;
  summary: string;
  content: string;
};

export type PostPage = {
  content: PostSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PostListParams = {
  page?: number;
  size?: number;
  blogUsername?: string;
};

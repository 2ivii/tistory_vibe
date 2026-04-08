export type PostSummary = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  authorName: string;
  authorDisplayName: string;
  createdAt: string;
  featured: boolean;
  category: string;
  readTime: string;
  likeCount: number;
  commentCount: number;
};

export type PostDetail = PostSummary & {
  content: string[];
};

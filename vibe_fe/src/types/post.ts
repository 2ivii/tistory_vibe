export type PostSummary = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  authorName: string;
  createdAt: string;
  featured: boolean;
};

export type PostDetail = PostSummary & {
  content: string[];
};

export type Comment = {
  id: number;
  postId: number;
  content: string;
  authorNickname: string;
  authorBlogUsername: string;
  createdAt: string;
  updatedAt: string;
  mine: boolean;
};

export type CommentCreateRequest = {
  content: string;
};

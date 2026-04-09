export type AccountBlogSummary = {
  blogUsername: string;
  blogTitle: string;
  role: string;
  primary: boolean;
};

export type AccountUserInfo = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
};

export type AccountManagement = {
  userInfo: AccountUserInfo;
  primaryBlog: AccountBlogSummary;
  ownedBlogs: AccountBlogSummary[];
  participatingBlogs: AccountBlogSummary[];
};

export type UpdatePrimaryBlogRequest = {
  blogUsername: string;
};

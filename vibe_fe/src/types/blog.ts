export type BlogProfile = {
  userId: number;
  username: string;
  displayName: string;
  blogTitle: string;
  bio: string | null;
  postCount: number;
  subscriberCount: number;
  subscribedByMe: boolean;
  isOwner: boolean;
};

export type SubscriptionActionResponse = {
  targetUserId: number;
  subscribed: boolean;
  subscriberCount: number;
};

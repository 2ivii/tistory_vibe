export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  nickname: string;
  blogUsername: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  userId: number;
  email: string;
  nickname: string;
  role: string;
};

export type CurrentUser = {
  id: number;
  email: string;
  nickname: string;
  blogUsername: string;
  blogTitle: string;
  bio: string | null;
  role: string;
};

export type AuthSession = {
  isLoggedIn: boolean;
  user: CurrentUser | null;
};

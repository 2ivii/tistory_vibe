export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  nickname: string;
  email: string;
  password: string;
};

export type CurrentUser = {
  nickname: string;
  blogUsername: string;
};

export type AuthSession = {
  isLoggedIn: boolean;
  user: CurrentUser;
};

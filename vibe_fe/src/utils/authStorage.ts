import type { AuthSession, CurrentUser } from "../types/auth";

const ACCESS_TOKEN_KEY = "vibe_access_token";
const CURRENT_USER_KEY = "vibe_current_user";
const AUTH_CHANGED_EVENT = "vibe-auth-changed";

function emitAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  emitAuthChanged();
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setCurrentUser(user: CurrentUser) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  emitAuthChanged();
}

export function getCurrentUser(): CurrentUser | null {
  const raw = localStorage.getItem(CURRENT_USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}

export function getAuthSession(): AuthSession {
  const user = getCurrentUser();
  const token = getAccessToken();

  return {
    isLoggedIn: Boolean(token && user),
    user
  };
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  emitAuthChanged();
}

export function subscribeAuthChange(callback: () => void) {
  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

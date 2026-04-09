import { useEffect, useState } from "react";
import type { AuthSession } from "../types/auth";
import { getAuthSession, subscribeAuthChange } from "../utils/authStorage";

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession>(() => getAuthSession());

  useEffect(() => {
    return subscribeAuthChange(() => {
      setSession(getAuthSession());
    });
  }, []);

  return session;
}

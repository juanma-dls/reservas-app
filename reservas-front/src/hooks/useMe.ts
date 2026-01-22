import { useEffect, useState } from "react";
import type { User } from "@/types/users/user";
import { getMe } from "@/services/auth";

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

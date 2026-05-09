import { useEffect, useState } from "react";
import type { Achievement } from "../types/achievements";

export function useUserAchievements(id: string | undefined) {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/users/${id}/achievements`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}

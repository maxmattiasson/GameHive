import { useState, useEffect } from "react";
import { getGameById } from "../services/gameService";
import type { Game } from "../types/game";

export function useGame(id: string) {
  const [data, setData] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGameById(id)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}

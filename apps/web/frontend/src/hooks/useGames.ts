import { useEffect, useState } from "react";
import { getAllGames } from "../services/gameService";
import type { Game } from "../types/game";

export function useGames() {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllGames()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

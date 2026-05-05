import { useEffect, useState } from "react";
import { getPlayerLibrary } from "../services/libraryService";

export function usePlaytime(gameId: string | undefined) {
  const [playtime, setPlaytime] = useState(0);
  useEffect(() => {
    const fetchPlaytime = async () => {
      if (!gameId) return;
      const library = await getPlayerLibrary();
      const entry = library.find((e) => e.gameId._id === gameId);
      if (entry) setPlaytime(entry.playtimeMinutes);
    };
    fetchPlaytime();
  }, [gameId]);
  return { playtime, setPlaytime };
}

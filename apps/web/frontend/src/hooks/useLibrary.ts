import { useEffect, useState } from "react";
import {
  getPlayerLibrary,
  type LibraryEntry
} from "../services/libraryService";

// get all player library games, show status and throw errors
export function useLibrary() {
  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlayerLibrary()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

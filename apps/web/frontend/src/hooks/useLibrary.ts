import { useCallback, useEffect, useState } from "react";
import {
  getPlayerLibrary,
  type LibraryEntry
} from "../services/libraryService";
import { useAuth } from "../hooks/useAuth";

// get all player library games, show status and throw errors
export function useLibrary(): {
  data: LibraryEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const { user } = useAuth();

  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const refetch = useCallback(() => setRefreshCount((c) => c + 1), []);

  useEffect(() => {
    getPlayerLibrary()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshCount, user?._id]);

  return { data, loading, error, refetch };
}

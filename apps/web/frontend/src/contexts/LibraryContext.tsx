import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from "react";
import {
  getPlayerLibrary,
  type LibraryEntry
} from "../services/libraryService";

type LibraryContextType = {
  data: LibraryEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const LibraryContext = createContext<LibraryContextType | null>(null);

// get all player library games, show status and throw errors

interface LibraryProviderProps {
  children: ReactNode;
}

export function LibraryProvider({ children }: LibraryProviderProps) {
  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const refetch = useCallback(() => setRefreshCount((c) => c + 1), []);

  useEffect(() => {
    setLoading(true);
    getPlayerLibrary()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshCount]);

  return (
    <LibraryContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context)
    throw new Error("useLibrary must be used within a LibraryProvider");
  return context;
}

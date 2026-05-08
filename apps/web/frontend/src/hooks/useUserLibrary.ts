import { useEffect, useState } from "react";
import type { LibraryEntry } from "../services/libraryService";

export function useUserLibrary(id: string | undefined) {
  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/users/${id}/library`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}

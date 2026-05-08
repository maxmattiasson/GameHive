import { useEffect, useState } from "react";
import type { LibraryEntry } from "../services/libraryService";

export function useUserLibrary(id: string) {
  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${id}/library`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  });

  return { data, loading };
}

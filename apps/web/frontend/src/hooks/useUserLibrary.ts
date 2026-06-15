import { useEffect, useState } from "react";
import type { LibraryEntry } from "../services/libraryService";
import { API_BASE_URL } from "../config/api";

export function useUserLibrary(idOrSlug: string | undefined) {
  const id = idOrSlug?.match(/[0-9a-f]{24}$/i)?.[0];

  const [data, setData] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/users/${id}/library`)
      .then((res) => res.json())
      .then((data) => setData(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}

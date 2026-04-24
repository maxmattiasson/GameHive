import { useMemo } from "react";

export function useSort<T>(
  items: T[],
  sortBy: keyof T,
  order: "asc" | "desc" = "asc"
) {
  return useMemo(() => {
    return [...items].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortBy, order]);
}

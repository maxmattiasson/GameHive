import { useMemo } from "react";

// sorts an array of objects in ascending or descending order.
export function useSort<T>(
  items: T[],
  sortBy: keyof T,
  order: "asc" | "desc" = "asc"
) {
  // only sort if item, SortBy or order changes, item creates a copy of the original array
  return useMemo(() => {
    return [...items].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortBy, order]);
}

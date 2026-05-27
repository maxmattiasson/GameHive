import { API_BASE_URL } from "../config/api";

export default async function getGenres() {
  const res = await fetch(`${API_BASE_URL}`);
  if (!res.ok) throw new Error("fetch genres failed");
  return res.json();
}

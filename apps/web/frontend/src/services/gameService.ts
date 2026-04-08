import type { Game } from "../types/game";

const API_URL = "http://localhost:3000/api/games";

export const getAllGames = async (): Promise<Game[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
};

import type { Game } from "../types/game";

const API_URL = "http://localhost:3000/api/games";

export const getAllGames = async (): Promise<Game[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
};

export const getGameById = async (id: string): Promise<Game> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Couldnt fetch game");
  return res.json();
};

export const getDevsOwnGames = async () => {
  const res = await fetch(`${API_URL}/my-games`, {
    credentials: "include",
  });
  
  if (!res.ok) throw new Error("Couldnt fetch devs own games")
  return res.json();
}
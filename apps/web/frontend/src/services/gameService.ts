import type { Game } from "../types/game";
import type { GamePayload } from "../types/gamePayload";

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

export const createGame = async (newGame: GamePayload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newGame),
  });

  if (!res.ok) throw new Error("Failed to create game");
  return res.json();
};

export const updateGame = async (id: string, updatedGame: GamePayload) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedGame),
  });

  if (!res.ok) throw new Error("Failed to update game");
  return res.json();
};

export const deleteGame = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete game");
  return true;
};
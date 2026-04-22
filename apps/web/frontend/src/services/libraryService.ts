import type { Game } from "../types/game";

const API_URL = "http://localhost:3000/api/library";

type LibraryEntry = {
  _id: string;
  userId: string;
  gameId: Game;
  status: "owned";
  playtimeMinutes: number;
  createdAt: string;
  updatedAt: string;
};

const parseApiError = async (res: Response, fallback: string) => {
  try {
    const data = await res.json();
    if (data && typeof data.message === "string") {
      return data.message;
    }
  } catch {
    // If body is empty or invalid JSON, return fallback.
  }
  return fallback;
};

export const getPlayerLibrary = async (): Promise<LibraryEntry[]> => {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(await parseApiError(res, "Failed to fetch library"));
  }

  return res.json();
};

export const addToLibrary = async (gameId: string): Promise<LibraryEntry> => {
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ gameId })
  });

  if (!res.ok) {
    throw new Error(await parseApiError(res, "Could not add game"));
  }

  return res.json();
};

export const updateLibraryEntry = async (
  gameId: string,
  playtimeMinutes: number
): Promise<LibraryEntry> => {
  const res = await fetch(`${API_URL}/${gameId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ playtimeMinutes })
  });

  if (!res.ok) {
    throw new Error(await parseApiError(res, "Could not update entry"));
  }

  return res.json();
};

export const removeFromLibrary = async (gameId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${gameId}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(await parseApiError(res, "Could not remove game"));
  }

  if (res.status !== 204) {
    await res.json().catch(() => undefined);
  }
};

export type { LibraryEntry };

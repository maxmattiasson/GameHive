import { API_BASE_URL } from "../config/api";
import type { Achievement } from "../types/achievements";

const API_URL = `${API_BASE_URL}/achievements`;

// Fetch all achievements from the backend, in case we want to list them sometime
export const getAllAchievements = async (): Promise<Achievement[]> => {
  const response = await fetch(API_URL, {
    credentials: "include",
  });
  const achievements = await response.json();
  return achievements;
};

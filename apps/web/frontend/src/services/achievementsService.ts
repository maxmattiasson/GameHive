import type { Achievement } from "../types/achievements";

const API_URL = "http://localhost:3000/api/achievements";

// Fetch all achievements from the backend, in case we want to list them sometime
export const getAllAchievements = async (): Promise<Achievement[]> => {
  const response = await fetch(API_URL);
  const achievements = await response.json();
  return achievements;
};

// Fetch the provided achievements IDs and return the corresponding achievement objects
export const getAchievementsByIds = async (ids: string[]): Promise<Achievement[]> => {
  const response = await fetch(`${API_URL}/ 
const 
import { API_BASE_URL } from "../config/api";

const REVIEWS_API_URL = `${API_BASE_URL}/reviews`;
const GAMES_API_URL = `${API_BASE_URL}/games`;

export const getGameReviews = async (gameId: string) => {
  const res = await fetch(`${GAMES_API_URL}/${gameId}/reviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

export const createReview = async (
  gameId: string,
  text: string,
  rating?: number
) => {
  const res = await fetch(`${GAMES_API_URL}/${gameId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      text,
      rating,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  return res.json();
};

export const voteReview = async (
  reviewId: string,
  value: 1 | -1
) => {
  const res = await fetch(`${REVIEWS_API_URL}/${reviewId}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      value,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to vote");
  }

  return res.json();
};

export const deleteReview = async (reviewId: string) => {
  const res = await fetch(`${REVIEWS_API_URL}/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete review");
  }

  return res.json();
};
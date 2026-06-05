import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/friends`;

export const sendFriendRequest = async (userId: string) => {
  const res = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ recipient: userId }),
  });

  if (!res.ok) throw new Error("Failed to send friend request");
  return res.json();
};

export const getPendingRequests = async () => {
  const res = await fetch(`${API_URL}/requests`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Couldnt fetch friend requests");
  return res.json();
};

export const acceptFriendRequest = async (id: string) => {
  const res = await fetch(`${API_URL}/requests/${id}/accept`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Couldnt fetch friend requests");
  return res.json();
};

export const rejectFriendRequest = async (id: string) => {
  const res = await fetch(`${API_URL}/requests/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Couldnt fetch friend requests");
  return res.json();
};

export const removeFriend = async (id: string) => {
  const res = await fetch(`${API_URL}/friends/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not remove friend");
  }
};

export const getFriends = async () => {
  const res = await fetch(`${API_URL}/friends`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Couldnt fetch friends");
  return res.json();
};

export const getFriendsByUserId = async (userId: string) => {
  const res = await fetch(`${API_URL}/friends/${userId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Couldn't fetch friends");
  return res.json();
};

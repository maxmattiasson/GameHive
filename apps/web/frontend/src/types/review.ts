import type { Game } from "./game";
import type { User } from "./user";

export type ReviewVote = {
  user: string;
  value: 1 | -1;
};

export type Review = {
  _id: string;
  user: User;
  game?: Game;
  text: string;
  rating?: number;
  votes: ReviewVote[];
  createdAt: string;
  updatedAt: string;
};
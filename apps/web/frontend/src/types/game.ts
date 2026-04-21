import type { Genre } from "./genre";

export interface Game {
  _id: string;
  title: string;
  release: Date;
  dev: string;
  genres: Genre[];
  platforms: string[];
  desc: string;
  thumb: string;
  multiplayer: boolean;
  avg_rating: number;
  review: any[];
}

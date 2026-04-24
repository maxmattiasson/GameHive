import type { Genre } from "./genre";

export interface Game {
  _id: string;
  title: string;
  release: string;
  dev: string;
  genres: Genre[];
  platforms: string[];
  desc: string;
  thumb: string;
  multiplayer: boolean;
  avg_rating: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  review: any[];
}

import { ObjectId } from "mongodb";

export interface Game {
  title: string;
  release: Date;
  dev: string;
  genres: ObjectId[];
  platforms: string[];
  desc: string;
  thumb: string;
  multiplayer: boolean;
  avg_rating: number;
  review: any[]; // change later when review type exists
}

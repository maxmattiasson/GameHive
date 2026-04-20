export interface Game {
  _id: string;
  title: string;
  release: Date;
  dev: string;
  genres: string[];
  platforms: string[];
  desc: string;
  thumb: string;
  multiplayer: boolean;
  avg_rating: number;
  review: any[];
}

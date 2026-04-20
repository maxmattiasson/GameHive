export type Game = {
  title: string;
  release: Date;
  dev: string;
  genres: string[];
  platforms: string[];
  desc: string;
  thumb: string;
  multiplayer: boolean;
  avg_rating: number;
  review: any[]; // change later when review type exists
};

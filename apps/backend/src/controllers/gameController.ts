import { Request, Response, NextFunction } from "express";
import Game from "../models/Game.js";

export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("funkar?");
  try {
    const { title, genre, release, dev, multiplayer } = req.query as {
      title?: string;
      genre?: string;
      release?: string;
      dev?: string;
      multiplayer?: "true" | "false";
    };

    const filter: any = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genres = { $regex: genre, $options: "i" };
    if (release) filter.release = release;
    if (dev) filter.dev = { $regex: dev, $options: "i" };
    if (multiplayer !== undefined) filter.multiplayer = multiplayer === "true";

    const games = await Game.find(filter);
    res.json(games);
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import Game from "../models/Game.js";

// List all games
export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("funkar");
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

// GET game by ID
export const getGamebyId = (req: Request, res: Response) => {
  return res.status(200).json(res.locals.game);
};

export const addNewGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("funkar?");

  const game = new Game({
    title: req.body.title,
    release: req.body.release,
    dev: req.body.dev,
    genres: req.body.genres,
    platforms: req.body.platforms,
    desc: req.body.desc,
    thumb: req.body.thumb,
    multiplayer: req.body.multiplayer,
    avg_rating: req.body.avg_rating,
    review: req.body.review,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

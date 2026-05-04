import { NextFunction, Request, Response } from "express";
import Game from "../models/Game.js";

// Middleware för id hantering
export default async function getGame(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const game = await Game.findById(req.params.id).populate("genres");
    if (!game) {
      return res.status(404).json({ message: "inget spel hittades" });
    }
    res.locals.game = game;
    next();
  } catch (error) {
    next(error);
  }
}

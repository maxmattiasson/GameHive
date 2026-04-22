import { Request, Response, NextFunction } from "express";
import LibraryModel from "../models/Library.js";
import { AuthRequest } from "../auth/authMiddleware.js";

// get all the games in player library
export const getPlayerLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const library = await LibraryModel.find({ userId }).populate(
      "gameId",
      "title thumb dev release multiplayer"
    );

    res.json(library);
  } catch (error) {
    next(error);
  }
};

// add to player library
export const addToLibrary = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {};

// update playtime and status on library entry(game)
export const updateLibraryEntry = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {};

import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import LibraryModel from "../models/Library.js";
import { AuthRequest } from "../auth/authMiddleware.js";

// checks if Id is valid
const toObjectId = (value: string) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }
  return new mongoose.Types.ObjectId(value);
};

// get all the games in player library
export const getPlayerLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const library = await LibraryModel.find({
      userId: new mongoose.Types.ObjectId(userId),
      status: "owned"
    }).populate("gameId", "title thumb dev release multiplayer");

    res.json(library);
  } catch (error) {
    next(error);
  }
};

// add to player library
export const addToLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { gameId } = req.body;

    if (typeof gameId !== "string") {
      return res.status(400).json({ message: "gameId must be a string" });
    }

    const userObjectId = toObjectId(userId);
    if (!userObjectId) {
      return res.status(400).json({ message: "Invalid authenticated user id" });
    }

    const gameObjectId = toObjectId(gameId);
    if (!gameObjectId) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    const entry = await LibraryModel.create({
      userId: userObjectId,
      gameId: gameObjectId,
      status: "owned"
    });

    const populated = await entry.populate(
      "gameId",
      "title thumb dev genres release multiplayer"
    );
    res.status(201).json(populated);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Game is already in library" });
    }
    next(error);
  }
};

// update playtime tracking on library entry(game)
export const updateLibraryEntry = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { gameId } = req.params;
    if (typeof gameId !== "string") {
      return res.status(400).json({ message: "gameId is required" });
    }

    const { playtimeMinutes } = req.body;

    const userObjectId = toObjectId(userId);
    if (!userObjectId) {
      return res.status(400).json({ message: "Invalid authenticated user id" });
    }

    const gameObjectId = toObjectId(gameId);
    if (!gameObjectId) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    if (playtimeMinutes !== undefined) {
      if (
        typeof playtimeMinutes !== "number" ||
        Number.isNaN(playtimeMinutes) ||
        playtimeMinutes < 0
      ) {
        return res
          .status(400)
          .json({ message: "playtimeMinutes must be a non-negative number" });
      }
    }

    const updates: {
      playtimeMinutes?: number;
    } = {};

    if (playtimeMinutes !== undefined)
      updates.playtimeMinutes = playtimeMinutes;

    const updated = await LibraryModel.findOneAndUpdate(
      {
        userId: userObjectId,
        gameId: gameObjectId
      },
      updates,
      { new: true, runValidators: true }
    ).populate("gameId", "title thumb dev genres release multiplayer");

    if (!updated)
      return res.status(404).json({ message: "Library entry not found" });

    return res.json(updated);
  } catch (error) {
    next(error);
  }
};

// remove a game from player library
export const removeFromLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { gameId } = req.params;
    if (typeof gameId !== "string") {
      return res.status(400).json({ message: "gameId is required" });
    }

    const userObjectId = toObjectId(userId);
    if (!userObjectId) {
      return res.status(400).json({ message: "Invalid authenticated user id" });
    }

    const gameObjectId = toObjectId(gameId);
    if (!gameObjectId) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    const removed = await LibraryModel.findOneAndDelete({
      userId: userObjectId,
      gameId: gameObjectId
    });

    if (!removed) {
      return res.status(404).json({ message: "Library entry not found" });
    }

    return res.status(200).json({ message: "Library entry removed" });
  } catch (error) {
    next(error);
  }
};

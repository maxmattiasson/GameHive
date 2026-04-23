import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import LibraryModel from "../models/Library.js";
import { AuthRequest } from "../auth/authMiddleware.js";

// validates string to mongoDb
const toObjectId = (value: string) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }
  return new mongoose.Types.ObjectId(value);
};

// only returns choosen fields from Game-model
const GAME_POPULATE_FIELDS = "title thumb dev genres release multiplayer";

// validates userId from JWT(req.user)
const getUserObjectId = (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  const userObjectId = toObjectId(userId);
  if (!userObjectId) {
    res.status(400).json({ message: "Invalid authenticated user id" });
    return null;
  }

  return userObjectId;
};

// validates and converts gameId from request
const getGameObjectId = (gameId: unknown, res: Response) => {
  if (typeof gameId !== "string") {
    res.status(400).json({ message: "gameId is required" });
    return null;
  }

  const gameObjectId = toObjectId(gameId);
  if (!gameObjectId) {
    res.status(400).json({ message: "Invalid gameId" });
    return null;
  }

  return gameObjectId;
};

// get all the games in logedin player library
export const getPlayerLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userObjectId = getUserObjectId(req, res);
    if (!userObjectId) return;

    const library = await LibraryModel.find({
      userId: userObjectId
    }).populate("gameId", GAME_POPULATE_FIELDS);

    return res.json(library);
  } catch (error) {
    next(error);
  }
};

// add to logedin player library
export const addToLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userObjectId = getUserObjectId(req, res);
    if (!userObjectId) return;

    const gameObjectId = getGameObjectId(req.body.gameId, res);
    if (!gameObjectId) return;

    const entry = await LibraryModel.create({
      userId: userObjectId,
      gameId: gameObjectId
    });

    const populated = await entry.populate("gameId", GAME_POPULATE_FIELDS);
    return res.status(201).json(populated);
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
    const userObjectId = getUserObjectId(req, res);
    if (!userObjectId) return;

    const gameObjectId = getGameObjectId(req.params.gameId, res);
    if (!gameObjectId) return;

    const { playtimeMinutes } = req.body;
    // playtimeMinutes is requierd and cant be a negative number
    if (
      typeof playtimeMinutes !== "number" ||
      Number.isNaN(playtimeMinutes) ||
      playtimeMinutes < 0
    ) {
      return res.status(400).json({
        message: "playtimeMinutes is required and must be a non-negative number"
      });
    }

    const updated = await LibraryModel.findOneAndUpdate(
      {
        userId: userObjectId,
        gameId: gameObjectId
      },
      { playtimeMinutes },
      { new: true, runValidators: true }
    ).populate("gameId", GAME_POPULATE_FIELDS);

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
    const userObjectId = getUserObjectId(req, res);
    if (!userObjectId) return;

    const gameObjectId = getGameObjectId(req.params.gameId, res);
    if (!gameObjectId) return;

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

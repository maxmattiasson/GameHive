import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import LibraryModel from "../models/Library.js";
import { AuthRequest } from "../auth/authMiddleware.js";
import { 
  ValidationError, 
  UnauthorizedError, 
  NotFoundError,
  ConflictError, 
} from "../errors/index.js";

// Converts a string to a MongoDB ObjectId if valid, otherwise returns null, ensures that only valid ObjectIds are used in database queries.
const toObjectId = (value: string) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }
  return new mongoose.Types.ObjectId(value);
};

// only returns choosen fields from Game-model, for speed.
const GAME_POPULATE_FIELDS = "title thumb dev genres release multiplayer";

// validates userId from JWT(req.user), if user is not logged in
const getUserObjectId = (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new UnauthorizedError();
  }

  const userObjectId = toObjectId(userId);
  if (!userObjectId) {
    throw new ValidationError("Invalid authenticated user id");
  }

  return userObjectId;
};

// validates and converts gameId from request
const getGameObjectId = (gameId: unknown, res: Response) => {
  if (typeof gameId !== "string") {
    throw new ValidationError("gameId is required");
  }

  const gameObjectId = toObjectId(gameId);
  if (!gameObjectId) {
    throw new ValidationError("Invalid gameId");
    return null;
  }

  return gameObjectId;
};

// get all the games in logged in player library from server, sends API
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
    }).populate({
      path: "gameId",
      select: GAME_POPULATE_FIELDS,
      populate: { path: "genres", select: "name" }
    });

    return res.json(library);
  } catch (error) {
    next(error);
  }
};

// add to logged in player library
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

    // Populates the gameId field with selected fields from the Game model and genre names,
    // so the frontend immediately receives all relevant game data in the response.
    const populated = await entry.populate({
      path: "gameId",
      select: GAME_POPULATE_FIELDS,
      populate: { path: "genres", select: "name" }
    });
    return res.status(201).json(populated);
  } catch (error: any) {
    if (error.code === 11000) {
      throw new ConflictError("Game is already in library");
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
    // playtimeMinutes is requierd and can't be a negative number
    if (
      typeof playtimeMinutes !== "number" ||
      Number.isNaN(playtimeMinutes) ||
      playtimeMinutes < 0
    ) {
      throw new ValidationError("playtimeMinutes is required and must be a non-negative number");
    }

    const updated = await LibraryModel.findOneAndUpdate(
      {
        userId: userObjectId,
        gameId: gameObjectId
      },
      { playtimeMinutes },
      { new: true, runValidators: true }
    ).populate({
      path: "gameId",
      select: GAME_POPULATE_FIELDS,
      populate: { path: "genres", select: "name" }
    });

    if (!updated)
      throw new NotFoundError("Library entry not found");

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
      throw new NotFoundError("Library entry not found");
    }

    return res.status(200).json({ message: "Library entry removed" });
  } catch (error) {
    next(error);
  }
};

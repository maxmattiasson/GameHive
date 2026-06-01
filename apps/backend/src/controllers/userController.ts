import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import FriendshipModel from "../models/Friendship.js";
import Review from "../models/Review.js";
import Game from "../models/Game.js";
import { NotFoundError } from "../errors/AppError.js";

const recalculateGameAverageRatings = async (gameIds: string[]) => {
  if (gameIds.length === 0) return;

  const objectIds = gameIds.map(
    (gameId) => new mongoose.Types.ObjectId(gameId),
  );

  const aggregation = await Review.aggregate<{
    _id: mongoose.Types.ObjectId;
    avgRating: number;
  }>([
    {
      $match: {
        game: { $in: objectIds },
        rating: { $exists: true },
      },
    },
    {
      $group: {
        _id: "$game",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const avgByGameId = new Map(
    aggregation.map((entry) => [entry._id.toString(), entry.avgRating]),
  );

  await Promise.all(
    gameIds.map((gameId) =>
      Game.findByIdAndUpdate(gameId, {
        avg_rating: avgByGameId.get(gameId) ?? 0,
      }),
    ),
  );
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const id = req.params.id as string;
    const user = await UserModel.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    const reviewsByUser = await Review.find({ user: id }).select("game");
    const affectedGameIds = [
      ...new Set(reviewsByUser.map((review) => review.game.toString())),
    ];

    await Promise.all([
      LibraryModel.deleteMany({ userId: id }),
      FriendshipModel.deleteMany({
        $or: [{ requester: id }, { recipient: id }],
      }),
      Review.deleteMany({ user: id }),
      Review.updateMany({}, { $pull: { votes: { user: id } } }),
      Game.updateMany({ ownerUserId: id }, { $unset: { ownerUserId: "" } }),
      UserModel.findByIdAndDelete(id),
    ]);

    await recalculateGameAverageRatings(affectedGameIds);

    res.json({
      message: "User deleted and related data cleaned up",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

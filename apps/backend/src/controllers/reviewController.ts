import { Response, NextFunction} from "express"
import { AuthRequest } from "../auth/authMiddleware.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import Game from "../models/Game.js";
import { z } from "zod";
import { createReviewSchema, voteReviewSchema, updateReviewSchema } from "../schemas/review.schema.js";
import { gameIdParamsSchema, reviewIdParamsSchema, idParamSchema } from "../schemas/common.schemas.js";

export const createReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { text, rating } = req.validatedBody as z.infer<typeof createReviewSchema>;
    const { gameId } = req.validatedParams as z.infer<typeof gameIdParamsSchema>
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    const review = new Review({
      game: gameId,
      user: userId,
      text,
      rating,
    });

    const newReview = await review.save();
    await updateGameAverageRating(gameId);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

export const getAllGamesReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameId } = req.validatedParams as z.infer<typeof gameIdParamsSchema>
    
    const reviews = await Review.find({
      game: new mongoose.Types.ObjectId(gameId),
    })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { reviewId } = req.validatedParams as z.infer<typeof reviewIdParamsSchema>;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }


    await review.deleteOne();
    const gameId = review.game.toString();

    await updateGameAverageRating(gameId);

    res.json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};

export const voteReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { reviewId } = req.validatedParams as z.infer<typeof reviewIdParamsSchema>;
    const { value } = req.validatedBody as  z.infer<typeof voteReviewSchema>;;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const existingVote = review.votes.find(
      (vote) => vote.user.toString() === userId
    );

    if (existingVote) {
      existingVote.value = value;
    } else {
      review.votes.push({
        user: new mongoose.Types.ObjectId(userId),
        value,
      });
    }

    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const removeReviewVote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { reviewId } = req.validatedParams as z.infer<typeof reviewIdParamsSchema>;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.votes = review.votes.filter(
      (vote) => vote.user.toString() !== userId
    );

    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.validatedParams as z.infer<typeof idParamSchema>;
    const reviews = await Review.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .populate("game", "title thumb dev release")
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { reviewId } = req.validatedParams as z.infer<typeof reviewIdParamsSchema>;
    const { text, rating } = req.validatedBody as z.infer<typeof updateReviewSchema>;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (text !== undefined) review.text = text;
    if (rating !== undefined) review.rating = rating;

    const updatedReview = await review.save();
    await updateGameAverageRating(review.game.toString());

    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};
const updateGameAverageRating = async (gameId: string) => {
  const result = await Review.aggregate([
    {
      $match: {
        game: new mongoose.Types.ObjectId(gameId),
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

  const avgRating = result[0]?.avgRating ?? 0;

  await Game.findByIdAndUpdate(gameId, {
    avg_rating: avgRating,
  });
};
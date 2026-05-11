import { Response, NextFunction} from "express"
import { AuthRequest } from "../auth/authMiddleware.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

export const createReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { text, rating } = req.body;
    const gameId = req.params.gameId;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!gameId || Array.isArray(gameId)) {
      return res.status(400).json({ message: "Invalid game id" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "Invalid game id" });
    }

    if (!text || text.trim().length === 0) {
        return res.status(400).json({ message: "Review text required" });
      }
      
      if (text.length > 1000) {
        return res.status(400).json({ message: "Review too long" });
      }
      
      if (rating !== undefined && (rating < 0 || rating > 5)) {
        return res.status(400).json({ message: "Invalid rating" });
      }

      const review = new Review({
        game: gameId,
        user: userId,
        text: text,
        rating,
      });

      try {
        const newReview = await review.save();
        res.status(201).json(newReview);
      } catch (error) {
        next(error);
      }
}

export const getAllGamesReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = req.params.gameId;

    if (!gameId || Array.isArray(gameId)) {
      return res.status(400).json({ message: "Invalid game id" });
    }

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "Invalid game id" });
    }

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
    const reviewId = req.params.reviewId;

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
    const reviewId = req.params.reviewId;
    const rawValue = Number(req.body.value);

    if (rawValue !== 1 && rawValue !== -1) {
      return res.status(400).json({ message: "Vote must be 1 or -1" });
    }
    
    const value: 1 | -1 = rawValue;    
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
    const reviewId = req.params.reviewId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

review.votes = review.votes.filter(
  (vote) => vote.user.toString() !== userId
) as any;

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
    const userId = req.params.id;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

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
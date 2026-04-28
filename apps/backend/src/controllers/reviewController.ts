import { Response, NextFunction} from "express"
import { AuthRequest } from "../auth/authMiddleware.js";
import Review from "../models/Review.js";

export const createReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { text, rating } = req.body;
    const gameId = req.params.gameId;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text || text.trim().length === 0) {
        return res.status(400).json({ message: "Review text required" });
      }
      
      if (text.length > 1000) {
        return res.status(400).json({ message: "Review too long" });
      }
      
      if (rating && (rating < 0 || rating > 5)) {
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
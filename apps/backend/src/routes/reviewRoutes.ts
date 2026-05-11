import express from "express"
import { authMiddleware } from "../auth/authMiddleware.js";
import { voteReview, deleteReview, removeReviewVote } from "../controllers/reviewController.js";

const router = express.Router();

// Delete one review
router.delete(
  "/:reviewId",
  authMiddleware,
  deleteReview
);

// Vote helpful / not helpful
router.post(
  "/:reviewId/vote",
  authMiddleware,
  voteReview
);

// Remove own vote
router.delete(
  "/:reviewId/vote",
  authMiddleware,
  removeReviewVote
);

export default router
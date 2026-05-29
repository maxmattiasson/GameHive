import express from "express";
import { authMiddleware } from "../auth/authMiddleware.js";
import {
  voteReview,
  deleteReview,
  removeReviewVote,
  updateReview
} from "../controllers/reviewController.js";
import { voteReviewSchema, updateReviewSchema } from "../schemas/review.schema.js";
import { validateRequest } from "../middleware/validate.js";
import { reviewIdParamsSchema } from "../schemas/common.schemas.js";

const router = express.Router();

// Delete one review
router.delete("/:reviewId", authMiddleware, validateRequest({ params: reviewIdParamsSchema }), deleteReview);

// Update review
router.patch("/:reviewId", authMiddleware, validateRequest({ params: reviewIdParamsSchema, body: updateReviewSchema }), updateReview);

// Vote helpful / not helpful
router.post("/:reviewId/vote", authMiddleware, validateRequest({ params: reviewIdParamsSchema, body: voteReviewSchema }), voteReview);

// Remove own vote
router.delete("/:reviewId/vote", authMiddleware, validateRequest({ params: reviewIdParamsSchema }), removeReviewVote);

export default router;

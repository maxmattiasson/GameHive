import { useCallback, useEffect, useState } from "react";
import { getGameReviews, voteReview } from "../services/reviewService";
import type { Review } from "../types/review";

export function useReviews(gameId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");

  const refetchReviews = useCallback(async () => {
    if (!gameId) return;

    try {
      setReviewsLoading(true);
      setReviewsError("");

      const data = await getGameReviews(gameId);
      setReviews(data);
    } catch (error) {
      console.error(error);
      setReviewsError("Could not load reviews");
    } finally {
      setReviewsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    refetchReviews();
  }, [refetchReviews]);

  const handleVote = async (reviewId: string, value: 1 | -1) => {
    try {
      await voteReview(reviewId, value);
      await refetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    reviews,
    reviewsLoading,
    reviewsError,
    refetchReviews,
    handleVote,
  };
}
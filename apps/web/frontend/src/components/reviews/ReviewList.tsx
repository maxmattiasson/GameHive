import ReviewItem from "./ReviewItem.js";
import type { Review } from "../../types/review.js";

type ReviewListProps = {
  reviews: Review[];
  currentUserId?: string;
  onVote?: (reviewId: string, value: 1 | -1) => void;
  onDelete?: (reviewId: string) => void;
  showGameTitle?: boolean;
};

export default function ReviewList({
  reviews,
  currentUserId,
  onVote,
  onDelete,
  showGameTitle = false,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          currentUserId={currentUserId}
          onVote={onVote}
          onDelete={onDelete}
          showGameTitle={showGameTitle}
        />
      ))}
    </section>
  );
}
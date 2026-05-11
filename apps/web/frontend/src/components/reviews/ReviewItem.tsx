import type { Review } from "../../types/review";

type ReviewItemProps = {
  review: Review;
  currentUserId?: string;
  onVote?: (reviewId: string, value: 1 | -1) => void;
  onDelete?: (reviewId: string) => void;
  showGameTitle?: boolean;
};

export default function ReviewItem({
  review,
  currentUserId,
  onVote,
  onDelete,
  showGameTitle = false,
}: ReviewItemProps) {
  const helpfulCount = review.votes.filter(
    (vote) => vote.value === 1
  ).length;

  const notHelpfulCount = review.votes.filter(
    (vote) => vote.value === -1
  ).length;

  const isOwnReview = review.user._id === currentUserId;

  return (
    <article>
      {showGameTitle && review.game && (
        <h3>{review.game.title}</h3>
      )}

      <p>
        <strong>{review.user.username}</strong>
      </p>

      {review.rating !== undefined && (
        <p>Rating: {review.rating}/5</p>
      )}

      <p>{review.text}</p>

      <small>
        {new Date(review.createdAt).toLocaleDateString()}
      </small>

      <div>
        <button
          type="button"
          onClick={() => onVote?.(review._id, 1)}
        >
          Helpful ({helpfulCount})
        </button>

        <button
          type="button"
          onClick={() => onVote?.(review._id, -1)}
        >
          Not helpful ({notHelpfulCount})
        </button>

        {isOwnReview && (
          <button
            type="button"
            onClick={() => onDelete?.(review._id)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
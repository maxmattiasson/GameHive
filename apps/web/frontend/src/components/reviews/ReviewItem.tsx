import type { Review } from "../../types/review";
import styles from "./ReviewItem.module.css";
import Button from "../ui/Button";

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
  const helpfulCount = review.votes.filter((vote) => vote.value === 1).length;

  const notHelpfulCount = review.votes.filter(
    (vote) => vote.value === -1,
  ).length;

  const isOwnReview = review.user._id === currentUserId;

  return (
    <article className={styles.reviewCont}>
      {showGameTitle && review.game && <h3>{review.game.title}</h3>}

      <p className={styles.reviewerName}>{review.user.username}</p>

      {review.rating !== undefined && <p>Rating: {review.rating}/5</p>}

      <p>{review.text}</p>

      <small>{new Date(review.createdAt).toLocaleDateString()}</small>

      <div>
        <Button color="vote" onClick={() => onVote?.(review._id, 1)}>
          Helpful ({helpfulCount})
        </Button>

        <Button color="vote" onClick={() => onVote?.(review._id, -1)}>
          Not helpful ({notHelpfulCount})
        </Button>

        {isOwnReview && (
          <Button color="vote" onClick={() => onDelete?.(review._id)}>
            Delete
          </Button>
        )}
      </div>
    </article>
  );
}

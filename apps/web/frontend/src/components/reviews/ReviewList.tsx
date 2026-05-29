import { useMemo, useState } from "react";
import ReviewItem from "./ReviewItem";
import type { Review } from "../../types/review";
import styles from "./ReviewList.module.css";

type ReviewListProps = {
  reviews: Review[];
  currentUserId?: string;
  onVote?: (reviewId: string, value: 1 | -1) => void;
  onDelete?: (reviewId: string) => void;
  showGameTitle?: boolean;
};

const REVIEWS_PER_PAGE = 5;

export default function ReviewList({
  reviews,
  currentUserId,
  onVote,
  onDelete,
  showGameTitle = false,
}: ReviewListProps) {
  const [page, setPage] = useState(1);

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const aHelpful = a.votes.filter((v) => v.value === 1).length;
      const bHelpful = b.votes.filter((v) => v.value === 1).length;
      if (bHelpful !== aHelpful) return bHelpful - aHelpful;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews]);

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = sortedReviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE,
  );

  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <section className={styles.section}>
      {paginatedReviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          currentUserId={currentUserId}
          onVote={onVote}
          onDelete={onDelete}
          showGameTitle={showGameTitle}
        />
      ))}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

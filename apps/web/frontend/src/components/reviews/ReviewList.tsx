import { useMemo, useState } from "react";
import ReviewItem from "./ReviewItem";
import type { Review } from "../../types/review";

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
      const aHelpful = a.votes.filter((vote) => vote.value === 1).length;
      const bHelpful = b.votes.filter((vote) => vote.value === 1).length;

      if (bHelpful !== aHelpful) {
        return bHelpful - aHelpful;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews]);

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);

  const paginatedReviews = sortedReviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE,
  );

  if (reviews.length === 0) {
    return (
      <div className="info-card">
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <section>
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
        <div>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                disabled={page === pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ReviewList from "../../components/reviews/ReviewList";
import { getUserReviews, deleteReview } from "../../services/reviewService";
import type { Review } from "../../types/review";
import styles from "./PlayerReviewsPage.module.css";

export function PlayerReviewsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = id ?? user?._id;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getUserReviews(userId);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError("Could not load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error("Could not remove review", err);
    }
  };

  if (!userId || loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>{error}</p>;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Reviews</h2>
      <ReviewList
        reviews={reviews}
        currentUserId={user?._id}
        onDelete={handleDelete}
        showGameTitle
      />
      <Link to="/profile" className={styles.backLink}>
        Back to profile
      </Link>
    </section>
  );
}

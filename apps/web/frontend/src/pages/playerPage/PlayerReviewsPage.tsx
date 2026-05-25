import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ReviewList from "../../components/reviews/ReviewList";
import { getUserReviews } from "../../services/reviewService";
import type { Review } from "../../types/review";
import { deleteReview } from "../../services/reviewService";

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
      } catch (error) {
        console.error(error);
        setError("Could not load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (!userId || loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Could not remove review", error);
    }
  };

  return (
    <section>
      <h2>Reviews</h2>

      <ReviewList
        reviews={reviews}
        currentUserId={user?._id}
        onDelete={handleDelete}
        showGameTitle
      />

      <br />
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

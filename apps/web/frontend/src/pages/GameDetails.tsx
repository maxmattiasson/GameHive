import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { Badge } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import "./GameDetails.css";
import { InfoCard } from "../components/ui/InfoCard";
import { updateLibraryEntry } from "../services/libraryService";
import { usePlaytime } from "../hooks/usePlaytime";
import { deleteReview } from "../services/reviewService";
import { useCallback, useEffect, useState } from "react";
import { getGameReviews } from "../services/reviewService";
import type { Review } from "../types/review";
import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";
import { voteReview } from "../services/reviewService";
import { useAuth } from "../hooks/useAuth";

export function GameDetails() {
  const { id } = useParams();
  const { data, loading, error } = useGame(id!);
  const { playtime, setPlaytime } = usePlaytime(id);
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const myReview = reviews.find((review) => review.user._id === user?._id);

  const handleDelete = async (revievId: string) => {
    try {
      await deleteReview(revievId);
      await fetchReviews();
    } catch (error) {
      console.error("Could not remove review", error);
    }
  };

  const fetchReviews = useCallback(async () => {
    if (!id) return;

    try {
      setReviewsLoading(true);
      setReviewsError("");

      const data = await getGameReviews(id);
      setReviews(data);
    } catch (error) {
      console.error(error);
      setReviewsError("Could not load reviews");
    } finally {
      setReviewsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleVote = async (reviewId: string, value: 1 | -1) => {
    try {
      await voteReview(reviewId, value);
      await fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Game not found</p>;

  return (
    <div className="container">
      <div className="header" style={{ backgroundImage: `url(${data.thumb})` }}>
        <h1>{data.title}</h1>
        <p>Rating: {data.avg_rating}/10</p>
        <p>
          {data.genres.map((g) => g.name).join(", ")} - {data.dev}
        </p>
      </div>
      <div className="details-container">
        <div className="col-1">
          <InfoCard>
            <ul>
              <li>
                <span>Release</span>
                <span className="bold">
                  {new Date(data.release).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span>Developer</span>
                <span className="bold">{data.dev}</span>
              </li>
              <li>
                <span>Genre</span>
                <span className="bold">
                  {data.genres.map((g) => g.name).join(", ")}
                </span>
              </li>
            </ul>
          </InfoCard>
          <div className="badges">
            <p>Tags</p>
            {data.genres.map((genre) => (
              <Badge key={genre._id} label={genre.name} />
            ))}
            {data.multiplayer && <Badge label="Multiplayer" />}
          </div>
          <div className="play-time">
            <InfoCard>
              <p>Time Played</p>
              <p>{playtime} min</p>
              <Button
                color="vote"
                onClick={async () => {
                  const newTime = playtime - 30;
                  setPlaytime(newTime);
                  await updateLibraryEntry(id!, newTime);
                }}
                disabled={playtime === 0}
              >
                −
              </Button>
              <Button
                color="vote"
                onClick={async () => {
                  const newTime = playtime + 30;
                  setPlaytime(newTime);
                  await updateLibraryEntry(id!, newTime);
                }}
              >
                +
              </Button>
            </InfoCard>
          </div>
        </div>
        <div className="col-2">
          <div className="reviews-container">
            <p>Recent Reviews</p>

            {reviewsLoading && <p>Loading reviews...</p>}
            {reviewsError && <p>{reviewsError}</p>}
            {!reviewsLoading && !reviewsError && (
              <ReviewList
                reviews={reviews}
                onVote={handleVote}
                currentUserId={user?._id}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>

        <div className="col-3">
          <InfoCard>
            <p className="span-title">Playtime Leaderboard</p>
            <ul>
              <li>1. Snubbe</li>
              <li>2. Klas</li>
              <li>3. Mira</li>
              <li>4. oskar</li>
            </ul>
          </InfoCard>
          <InfoCard>
            {showReviewForm ? (
              <ReviewForm
                gameId={id!}
                existingReview={myReview}
                onReviewCreated={() => {
                  fetchReviews();
                  setShowReviewForm(false);
                }}
              />
            ) : (
              <Button
                color="primary"
                type="button"
                onClick={() => setShowReviewForm(true)}
              >
                Write a review
              </Button>
            )}
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useGame } from "../hooks/useGame";
import { usePlaytime } from "../hooks/usePlaytime";
import { useAuth } from "../hooks/useAuth";
import { useReviews } from "../hooks/useReviews";

import { Badge } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { InfoCard } from "../components/ui/InfoCard";
import RemoveButton from "../components/ui/RemoveButton";

import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";

import { updateLibraryEntry } from "../services/libraryService";
import { deleteGame } from "../services/gameService";
import { deleteReview } from "../services/reviewService";

import "./GameDetails.css";

export function GameDetails() {
  const navigate = useNavigate();
  const { id: slug } = useParams();
  const id = slug?.match(/[0-9a-f]{24}$/i)?.[0];

  const { data, loading, error } = useGame(id!);
  const { playtime, setPlaytime } = usePlaytime(id);
  const { user } = useAuth();

  const [showReviewForm, setShowReviewForm] = useState(false);

  const {
    reviews,
    reviewsLoading,
    reviewsError,
    refetchReviews,
    handleVote,
    averageRating,
  } = useReviews(id);

  const myReview = reviews.find((review) => review.user._id === user?._id);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      await refetchReviews();
    } catch (error) {
      console.error("Could not remove review", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Game not found</p>;

  const isAdmin = user?.role === "admin";

  const handleDeleteGame = async (gameId: string) => {
    try {
      await deleteGame(gameId);
      navigate("/games");
    } catch (error) {
      console.error("Could not remove game", error);
    }
  };

  return (
    <div className="container">
      <div className="header" style={{ backgroundImage: `url(${data.thumb})` }}>
        <h1>{data.title}</h1>
        <p>Rating: {averageRating ? averageRating.toFixed(1) : "0"}/5</p>
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

          {user ? (
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
          ) : null
          }
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
                onDelete={handleDeleteReview}
              />
            )}
          </div>
        </div>

        <div className="col-3">
          <InfoCard>
            {user ? (
            <ReviewForm
              gameId={id!}
              existingReview={myReview}
              onReviewCreated={() => {
                refetchReviews();
                setShowReviewForm(false);
              }}
            />
            ) : (
              <>
              <h3>Write a review</h3>
              <p>Log in to rate games and write reviews.</p>
              </>
            )}
          </InfoCard>
        </div>
      </div>

      {isAdmin && (
        <div className="container">
          <RemoveButton gameId={data._id} onDelete={handleDeleteGame}>
            Remove Game
          </RemoveButton>
        </div>
      )}
    </div>
  );
}

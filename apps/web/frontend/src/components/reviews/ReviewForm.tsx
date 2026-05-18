import { useState } from "react";
import { createReview, updateReview } from "../../services/reviewService";
import styles from "./ReviewForm.module.css";
import type { Review } from "../../types/review";
import Button from "../ui/Button";

type ReviewFormProps = {
  gameId: string;
  existingReview?: Review;
  onReviewCreated?: () => void;
};

export default function ReviewForm({
  gameId,
  existingReview,
  onReviewCreated,
}: ReviewFormProps) {
  const [text, setText] = useState(existingReview?.text ?? "");
  const [rating, setRating] = useState(
    existingReview?.rating?.toString() ?? "",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsLoading(true);

      if (!text.trim() && !rating) {
        setErrorMessage("Write a review or choose a rating");
        return;
      }

      if (existingReview) {
        await updateReview(
          existingReview._id,
          text.trim(),
          rating ? Number(rating) : undefined,
        );
      } else {
        await createReview(
          gameId,
          text.trim(),
          rating ? Number(rating) : undefined,
        );
      }

      setText("");
      setRating("");

      onReviewCreated?.();
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not create review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a review</h3>

      {errorMessage && <p>{errorMessage}</p>}

      <div className={styles.formRating}>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">No rating</option>
          {[5, 4, 3, 2, 1].map((score) => (
            <option key={score} value={score}>
              {score} / 5
            </option>
          ))}
        </select>
      </div>
      <div className={styles.reviewCont}>
        <label htmlFor="reviewText">Your review</label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you think about the game?"
          rows={5}
        />

        <Button color="vote" type="submit" disabled={isLoading}>
          {isLoading
            ? "Submitting..."
            : existingReview
              ? "Update review"
              : "Submit review"}
        </Button>
      </div>
    </form>
  );
}

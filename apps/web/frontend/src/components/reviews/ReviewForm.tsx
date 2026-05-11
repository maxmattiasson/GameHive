import { useState } from "react";
import { createReview } from "../../services/reviewService";

type ReviewFormProps = {
  gameId: string;
  onReviewCreated?: () => void;
};

export default function ReviewForm({
  gameId,
  onReviewCreated,
}: ReviewFormProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!text.trim()) {
      setErrorMessage("Review text is required");
      return;
    }

    try {
      setIsLoading(true);

      await createReview(
        gameId,
        text.trim(),
        rating ? Number(rating) : undefined
      );

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
      <h2>Write a review</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">No rating</option>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
          <option key={score} value={score}>
            {score} / 10
          </option>
        ))}
      </select>

      <label htmlFor="reviewText">Your review</label>
      <textarea
        id="reviewText"
        name="reviewText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What did you think about the game?"
        rows={5}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
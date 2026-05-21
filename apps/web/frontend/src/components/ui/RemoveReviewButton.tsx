import Button from "./Button";

interface RemoveReviewButtonProps {
  reviewId: string;
  onDelete: (reviewId: string) => void;
  disabled?: boolean;
}

export default function RemoveReviewButton({
  reviewId,
  onDelete,
  disabled
}: RemoveReviewButtonProps) {
  const handleClick = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this review? This can not be undone!"
      )
    )
      onDelete(reviewId);
  };

  return (
    <Button color="vote" onClick={handleClick} disabled={disabled}>
      X
    </Button>
  );
}

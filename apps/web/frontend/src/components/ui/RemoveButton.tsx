import type { ReactNode } from "react";
import Button from "./Button";

interface RemoveButtonProps {
  reviewId?: string;
  gameId?: string;
  onDelete: (id: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export default function RemoveButton({
  reviewId,
  gameId,
  onDelete,
  disabled,
  children,
}: RemoveButtonProps) {
  const handleDelete = () => {
    if (gameId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this game?",
      );
      if (confirmed) {
        onDelete(gameId);
      }
      return;
    }
    if (reviewId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review? This can not be undone!",
      );
      if (confirmed) {
        onDelete(reviewId);
      }
      return;
    }
  };

  return (
    <Button color="vote" onClick={handleDelete} disabled={disabled}>
      {children}
    </Button>
  );
}

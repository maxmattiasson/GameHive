import type { ReactNode } from "react";
import Button from "./Button";

interface RemoveButtonProps {
  reviewId?: string;
  gameId?: string;
  onDelete: (id: string) => void;
  disabled?: boolean;
  children?: ReactNode;
  id?: string;
}

export default function RemoveButton({
  reviewId,
  gameId,
  onDelete,
  disabled,
  children,
  id
}: RemoveButtonProps) {
  const handleDelete = () => {
    if (gameId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this game? This can not be undone!"
      );
      if (confirmed) {
        onDelete(gameId);
      }
      return;
    }
    if (reviewId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review? This can not be undone!"
      );
      if (confirmed) {
        onDelete(reviewId);
      }
      return;
    }
    if (id) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user? This can not be undone!"
      );
      if (confirmed) {
        onDelete(id);
      }
      return;
    }
  };

  return (
    <Button color="danger" onClick={handleDelete} disabled={disabled}>
      {children}
    </Button>
  );
}

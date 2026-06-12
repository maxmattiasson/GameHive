import type { ReactNode } from "react";
import Button from "./Button";

interface RemoveButtonProps {
  reviewId?: string;
  gameId?: string;
  onDelete: (id: string) => void;
  disabled?: boolean;
  children?: ReactNode;
  id?: string;
  self?: string;
}

export default function RemoveButton({
  reviewId,
  gameId,
  onDelete,
  disabled,
  children,
  id,
  self
}: RemoveButtonProps) {
  const handleDelete = () => {
    if (gameId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this game? This CANNOT be undone!"
      );
      if (confirmed) {
        onDelete(gameId);
      }
      return;
    }
    if (reviewId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review? This CANNOT be undone!"
      );
      if (confirmed) {
        onDelete(reviewId);
      }
      return;
    }
    if (id) {
      const confirmed = window.prompt(
        "Are you sure you want to delete this user and all their data? This CANNOT be undone!"
      );
      if (confirmed === "delete") {
        onDelete(id);
      }
      return;
    }
    if (self) {
      const confirmed = window.prompt(
        "Are you sure you want to delete your account? This will remove all your game collection, you reviews, playing time and achievements and CANNOT BE UNDONE! If you still want to be deleted, type in 'delete' in this box and click OK."
      );
      if (confirmed === "delete") {
        onDelete(self);
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

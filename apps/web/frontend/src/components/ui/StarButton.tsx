import { useEffect, useState } from "react";
import "./StarButton.css";
import {
  addToLibrary,
  removeFromLibrary,
  type LibraryEntry
} from "../../services/libraryService";
import type { Game } from "../../types/game";

interface StarButtonProps {
  game: Game;
  playerLibrary: LibraryEntry[];
}

export function StarButton({ game, playerLibrary }: StarButtonProps) {
  const [isInLibrary, setIsInLibrary] = useState(false);

  // Check if the game is already in the player's library
  useEffect(() => {
    const found = playerLibrary.find((entry) => entry.gameId._id === game._id);
    setIsInLibrary(!!found);
  }, [playerLibrary, game._id]);

  const handleClick = async () => {
    // warning for removing game
    if (isInLibrary) {
      const confirmed = window.confirm(
        "You are about to remove this game from your library, all your playtime will be lost. Do you want to continue?"
      );
      if (!confirmed) return;
      await removeFromLibrary(game._id);
      setIsInLibrary(false);
    } else {
      await addToLibrary(game._id);
      setIsInLibrary(true);
    }
  };

  return (
    <button
      className={isInLibrary ? "star-button in-library" : "star-button"}
      onClick={handleClick}
      aria-label={isInLibrary ? "Remove from library" : "Add to library"}
    >
      {isInLibrary ? "★" : "☆"}
    </button>
  );
}
export default StarButton;

import { useEffect, useState } from "react";
import "./StarButton.css";
import { addToLibrary, removeFromLibrary } from "../../services/libraryService";
import type { Game } from "../../types/game";
import { useLibrary } from "../../contexts/LibraryContext";
import { useParams } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";

interface StarButtonProps {
  game: Game;
}

export function StarButton({ game }: StarButtonProps) {
  const { id } = useParams();
  const { notify } = useNotifications();
  if (id) return null;

  const [isInLibrary, setIsInLibrary] = useState(false);
  const { data: playerLibrary, refetch } = useLibrary();

  // Check if the game is already in the player's library
  useEffect(() => {
    const found = playerLibrary.find((entry) => entry.gameId._id === game._id);
    setIsInLibrary(!!found);
  }, [playerLibrary, game._id]);

  const handleClick = async () => {
    // warning for removing game
    if (isInLibrary) {
      const confirmed = window.confirm(
        "You are about to remove this game from your library, all your playtime will be lost. Do you want to continue?",
      );
      if (!confirmed) return;
      await removeFromLibrary(game._id);
      refetch();
    } else {
      const apiResponse = await addToLibrary(game._id);
      // if(apiResponse.newUnlocks[0]) {
      //   notify(
      //     `Achievement unlocked: ${apiResponse.newUnlocks.length} new achievement(s) unlocked!`
      //   );
      // }
      console.log("apiResponse from addToLibrary:", apiResponse);
      refetch();
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

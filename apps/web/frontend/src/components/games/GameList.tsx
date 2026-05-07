import type { Game } from "../../types/game";
import type { LibraryEntry } from "../../services/libraryService";
import { GameCard } from "./GameCard";
import "./GameList.css";

interface Props {
  games: Game[];
  playerLibrary: LibraryEntry[];
}

export function GameList({ games, playerLibrary }: Props) {
  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game._id} game={game} playerLibrary={playerLibrary} />
      ))}
    </div>
  );
}

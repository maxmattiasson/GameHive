import type { Game } from "../../types/game";
import { GameCard } from "./GameCard";
import "./GameList.css";

interface Props {
  games: Game[];
  compact?: boolean;
}

export function GameList({ games, compact }: Props) {
  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game._id} game={game} compact={compact} />
      ))}
    </div>
  );
}

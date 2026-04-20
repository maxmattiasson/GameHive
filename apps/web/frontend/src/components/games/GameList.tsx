import type { Game } from "../../types/game";
import { GameCard } from "./GameCard";
import "./GameList.css";

interface Props {
  games: Game[];
}

export function GameList({ games }: Props) {
  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}

import type { Game } from "../../types/game";
import { GameCard } from "./GameCard";
import styles from "./GameList.module.css";

interface Props {
  games: Game[];
  compact?: boolean;
  featured?: boolean;
}

export function GameList({ games, compact, featured }: Props) {
  return (
    <div className={featured ? styles.featured : styles.gameList}>
      {games
        .filter((game) => game && game._id)
        .map((game) => (
          <GameCard
            key={game._id}
            game={game}
            compact={compact}
            featured={featured}
          />
        ))}
    </div>
  );
}

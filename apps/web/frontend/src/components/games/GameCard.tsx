import type { Game } from "../../types/game";
import { Badge } from "../ui/Badge";
import "./GameCard.css";
import "../ui/ArrowButton.css";
import { StarButton } from "../ui/StarButton";

interface Props {
  game: Game;
  compact?: boolean;
}

export function GameCard({ game, compact }: Props) {

  return (
    <div className={`game-card-small ${compact ? "compact" : ""}`}>
      <div className="image-wrapper">
        <StarButton game={game} />
        <img src={game.thumb || "..."} alt="Game Cover" />
      </div>
      <div className="inner">
        <h3>{game.title}</h3>
        <h4>{game.dev}</h4>
        {!compact && <p className="meta">Rating: {game.avg_rating ? game.avg_rating.toFixed(1): "0"}/5</p>}
        {!compact && <p className="desc">{game.desc}</p>}
        {!compact && (
          <p className="meta">
            Release date: {new Date(game.release).toLocaleDateString()}
          </p>
        )}
        {!compact && (
          <div className="badges">
            {game.genres.map((genre) => (
              <Badge key={genre._id} label={genre.name} />
            ))}
            {game.multiplayer && <Badge label="Multiplayer" />}
          </div>
        )}
        <a className="arrow-button" href={`/games/${game._id}`}>
          View Game <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}

import type { Game } from "../../types/game";
import { Badge } from "../ui/Badge";
import { StarButton } from "../ui/StarButton";
import styles from "./GameCard.module.css";
import { slugify } from "../../helpers/slugify";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
  compact?: boolean;
  featured?: boolean;
}

export function GameCard({ game, compact, featured }: Props) {
  const cardClass = [
    styles.card,
    compact ? styles.compact : "",
    featured ? styles.featured : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClass}>
      <div className={styles.imageWrapper}>
        <div className={styles.starButton}>
          <StarButton game={game} />
        </div>
        <img
          className={styles.image}
          src={game.thumb || "..."}
          alt={game.title}
        />
      </div>
      <div className={styles.inner}>
        <h3>{game.title}</h3>
        <h4>{game.dev}</h4>
       {!compact && <p className="desc">{game.desc}</p>}
        {!compact && (
          <p className={styles.meta}>Rating: {Number(game.avg_rating ?? 0).toFixed(1).replace(/\.0$/, "")}/5</p>
        )}
        {!compact && (
          <p className={styles.meta}>
            Release: {new Date(game.release).toLocaleDateString()}
          </p>
        )}
        {!compact && (
          <div className={styles.badges}>
            {game.genres.map((genre) => (
              <Badge key={genre._id} label={genre.name} />
            ))}
            {game.multiplayer && <Badge label="Multiplayer" />}
          </div>
        )}

        <Link
          className={styles.viewLink}
          to={`/games/${slugify(game.title)}-${game._id}`}
        >
          View Game →
        </Link>
      </div>
    </div>
  );
}

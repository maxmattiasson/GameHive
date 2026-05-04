import type { Game } from "../../types/game";
import { Badge } from "../ui/Badge";
import "./GameCard.css";
import "../ui/ArrowButton.css";

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  console.log(game._id);
  return (
    <div className="game-card-small">
      <div>
        <img
          src={game.thumb || "https://gaming-cdn.com/images/products/20970/616x353/mimesis-pc-steam-cover.jpg?v=1761750647"}
          alt="Game Cover"  
        />
      </div>
      <div className="inner">
        <h3>{game.title}</h3>
        <h4>{game.dev}</h4>
        <p className="meta">Rating: {game.avg_rating}/10</p>
        <p className="desc">{game.desc}</p>
        <p className="meta">
          Release date: {new Date(game.release).toLocaleDateString()}
        </p>
        <div className="badges">
          {game.genres.map((genre) => (
            <Badge key={genre._id} label={genre.name} />
          ))}
          {game.multiplayer && <Badge label="Multiplayer" />}
        </div>
        <a className="arrow-button" href={`/games/${game._id}`}>
          View Game
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}

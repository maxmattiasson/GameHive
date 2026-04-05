import type { Game } from "../../types/game";
import { Badge } from "../ui/Badge";
import "./GameCard.css";

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  return (
    <div className="game-card-small">
      <div>
        <img
          src="https://gaming-cdn.com/images/products/20970/616x353/mimesis-pc-steam-cover.jpg?v=1761750647"
          alt="Game Cover"
        />
      </div>
      <div className="inner">
        <h3>{game.title}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          explicabo!
        </p>
        <p>{game.created}</p>
        <div className="badges">
          <Badge label={game.genre} />
          {game.multiplayer && <Badge label="Multiplayer" />}
        </div>
        <a href="">View Game</a>
      </div>
    </div>
  );
}

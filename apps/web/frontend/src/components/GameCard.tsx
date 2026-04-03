import type { Game } from "../types/game";
import "./GameCard.css";

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  return (
    <div className="game-card-small">
      <div>
        <img src="https://picsum.photos/300/200" alt="Game Cover" />
      </div>
      <div className="inner">
        <h3>{game.title}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          explicabo!
        </p>
        <p>{game.created}</p>
        <p>{game.genre}</p>
        <p>{game.multiplayer}</p>
        <a href="">View Game</a>
      </div>
    </div>
  );
}

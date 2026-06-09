import type { Game } from "../../../types/game";
import styles from "./DevGamesList.module.css";
import Button from "../../ui/Button";

type Props = {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
};

export default function DevGamesList({ games, onEdit, onDelete }: Props) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Published games</h4>
      {games.length === 0 ? (
        <p className={styles.empty}>No games yet</p>
      ) : (
        games.map((game) => (
          <div key={game._id} className={styles.item}>
            <a href={`/games/${game._id}`} className={styles.gameLink}>
              {game.title}
            </a>
            <div className={styles.actions}>
              <Button color="secondary" onClick={() => onEdit(game)}>
                Edit
              </Button>
              <Button color="vote" onClick={() => onDelete(game._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

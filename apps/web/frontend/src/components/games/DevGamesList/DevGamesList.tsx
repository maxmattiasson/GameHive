import type { Game } from "../../../types/game";
import styles from "./DevGamesList.module.css"

type Props = {
    games: Game[];
    onEdit: (game: Game) => void;
    onDelete: (id: string) => void;
  };

export default function DevGamesList({ games, onEdit, onDelete }: Props){

    return (
        <div className={styles.DevListCont}>
            <h4 className={styles.title}>Published games</h4>
            {games.length === 0 ? (
                <p>No games yet</p>
            ) : (
                games.map((game) => (
                <div key={game._id} className={styles.DevGameItem}>
                    <div>{game.title}</div>
                    <button onClick={() => onEdit(game)}>Edit</button>
                    <button onClick={() => onDelete(game._id)}>Delete</button>
                </div>
                ))
            )}
        </div>
    )
}


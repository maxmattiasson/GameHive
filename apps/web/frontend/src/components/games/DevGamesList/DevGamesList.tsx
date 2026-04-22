import type { Game } from "../../../types/game";

type Props = {
    games: Game[];
    onEdit: (game: Game) => void;
    onDelete: (id: string) => void;
  };

export default function DevGamesList({ games, onEdit, onDelete }: Props){

    return (
        <div>
            {games.length === 0 ? (
                <p>No games yet</p>
            ) : (
                games.map((game) => (
                <div key={game._id}>
                    <div>{game.title}</div>
                    <button onClick={() => onEdit(game)}>Edit</button>
                    <button onClick={() => onDelete(game._id)}>Delete</button>
                </div>
                ))
            )}
        </div>
    )
}


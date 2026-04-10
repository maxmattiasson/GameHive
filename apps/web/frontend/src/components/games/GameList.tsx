import { useGames } from "../../hooks/useGames";
import { GameCard } from "./GameCard";
import "./GameList.css";

interface Props {
  limit?: number;
}

export function GameList({ limit }: Props) {
  const { data, loading, error } = useGames();

  //early returns
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} </p>;

  const games = limit ? data.slice(0, limit) : data; //slice array to limit, otherwise return all

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}

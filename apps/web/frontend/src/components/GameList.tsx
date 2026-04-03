import { useGames } from "../hooks/useGames";
import { GameCard } from "./GameCard";

export function GameList() {
  const { data, loading, error } = useGames();

  //early returns
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} </p>;

  return (
    <div>
      {data.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}

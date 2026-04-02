import { useGames } from "../hooks/useGames";

export function GameList() {
  const { data, loading, error } = useGames();

  //early returns
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} </p>;

  return (
    <ul>
      {data.map((game) => (
        <li key={game._id}>{game.title}</li>
      ))}
    </ul>
  );
}

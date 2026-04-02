import { useGames } from "../hooks/useGames";

export function GameList() {
  const { data, loading, error } = useGames();

  //early returns
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} </p>;

  return (
    <div>
      {data.map((game) => (
        <article key={game._id}>
          <h3>{game.title}</h3>
          <p>{game.genre}</p>
          {game.multiplayer && <p>Multiplayer</p>}
          <p>
            Released {game.created} by {game.dev}
          </p>
        </article>
      ))}
    </div>
  );
}

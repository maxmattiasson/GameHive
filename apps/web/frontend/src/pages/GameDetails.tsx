import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { Badge } from "../components/ui/Badge";
import "./GameDetails.css";

export function GameDetails() {
  const { id } = useParams();
  const { data, loading, error } = useGame(id!);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Game not found</p>;

  return (
    <div className="game-details-container">
      <div className="game-details-img">
        <img
          src="https://gaming-cdn.com/images/products/20970/616x353/mimesis-pc-steam-cover.jpg?v=1761750647"
          alt="Game Cover"
        />
      </div>
      <div className="game-details-info">
        <h1>{data.title}</h1>
        <h2>{data.dev}</h2>
        <p>{data.avg_rating}/10</p>
        <p>{data.desc}</p>
        <p>Release date: {new Date(data.release).toLocaleDateString()}</p>
        <div className="badges">
          {data.genres.map((genre) => (
            <Badge key={genre} label={genre} />
          ))}
          {data.multiplayer && <Badge label="Multiplayer" />}
        </div>
      </div>
    </div>
  );
}

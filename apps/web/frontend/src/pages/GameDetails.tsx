import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { Badge } from "../components/ui/Badge";
import "./GameDetails.css";
import { InfoCard } from "../components/ui/InfoCard";

export function GameDetails() {
  const { id } = useParams();
  const { data, loading, error } = useGame(id!);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Game not found</p>;

  return (
    <div className="container">
      <div className="header">
        <h1>{data.title}</h1>
        <p>Rating: {data.avg_rating}/10</p>
        <p>
          {data.genres} - {data.dev}
        </p>
      </div>
      <div className="details-container">
        <div className="col-1">
          <InfoCard>
            <ul>
              <li>
                <span>Release</span>
                <span className="bold">
                  {new Date(data.release).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span>Developer</span>
                <span className="bold">{data.dev}</span>
              </li>
              <li>
                <span>Genre</span>
                <span className="bold">{data.genres}</span>
              </li>
            </ul>
          </InfoCard>
          <div className="badges">
            <p>Tags</p>
            {data.genres.map((genre) => (
              <Badge key={genre} label={genre} />
            ))}
            {data.multiplayer && <Badge label="Multiplayer" />}
          </div>
        </div>
        <div className="col-2">
          <InfoCard>
            <p>Dev News</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              eaque? Sed sint beatae.
            </p>
          </InfoCard>
          <div className="reviews-container">
            <p>Recent Reviews</p>
            <InfoCard>
              <p>Oskar</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </InfoCard>
            <InfoCard>
              <p>Pelle</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti quas praesentium ipsam, veritatis voluptatem sint.
              </p>
            </InfoCard>
            <InfoCard>
              <p>Klas</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                soluta in architecto eius.
              </p>
            </InfoCard>
          </div>
        </div>
        <div className="col-3">
          <InfoCard>
            <p>Playtime Leaderboard</p>
            <ul>
              <li>1. Snubbe</li>
              <li>2. Klas</li>
              <li>3. Mira</li>
              <li>4. oskar</li>
            </ul>
          </InfoCard>
          <InfoCard>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est et
              natus ea sit eos reiciendis voluptas aperiam aliquid deserunt
              voluptates.
            </p>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

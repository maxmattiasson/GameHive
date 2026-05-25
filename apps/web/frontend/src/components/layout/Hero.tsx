import "./Hero.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-left">
        <div className="text-group">
          <h2>
            Find Games.
            <br />
            Track What You Play.
          </h2>
          <p>
            Discover, track, and review your favorite games - all in one place.
          </p>
        </div>
        <div className="button-group">
          <Button color="primary" onClick={() => navigate("/games")}>
            Explore
          </Button>
          <Button color="secondary">Something</Button>
        </div>
      </div>
      <div className="hero-right">
        <img src="https://www.gamespot.com/wp-content/uploads/original/1601/16018044/4631581-bestpcgames2026.jpg" />
      </div>
    </div>
  );
}

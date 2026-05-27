import styles from "./Hero.module.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.textGroup}>
          <h2>
            Find Games.
            <br />
            Track What You Play.
          </h2>
          <p>
            Discover, track, and review your favorite games — all in one place.
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <Button color="primary" onClick={() => navigate("/games")}>
            Explore
          </Button>
          <Button color="secondary">Something</Button>
        </div>
      </div>
      <div className={styles.heroRight}>
        <img
          src="https://www.gamespot.com/wp-content/uploads/original/1601/16018044/4631581-bestpcgames2026.jpg"
          alt="Featured games"
        />
      </div>
    </div>
  );
}

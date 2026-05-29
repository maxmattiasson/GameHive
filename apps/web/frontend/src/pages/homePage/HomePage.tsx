import { GameList } from "../../components/games/GameList";
import { useGames } from "../../hooks/useGames";
import Hero from "../../components/layout/Hero";
import styles from "./Homepage.module.css";

export function HomePage() {
  const { data } = useGames();

  const shuffleGames = (array: typeof data) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const games = shuffleGames(data).slice(0, 3);

  return (
    <>
      <Hero />
      <div className={styles.homepage}>
        <h3>This Week&apos;s Featured Games</h3>
        <GameList games={games} featured />
      </div>
    </>
  );
}

import { Link, useParams } from "react-router-dom";
import GameSort from "../../components/games/gameSort/GameSort";
import { useSort } from "../../hooks/useSort";
import { useLibrary } from "../../contexts/LibraryContext";
import { GameList } from "../../components/games/GameList";
import { useState } from "react";
import type { Game } from "../../types/game";
import { useUserLibrary } from "../../hooks/useUserLibrary";
import styles from "./PlayerLibraryPage.module.css";

export function PlayerLibraryPage() {
  const ownLibrary = useLibrary();
  const { id } = useParams();
  const userLibrary = useUserLibrary(id);

  const libraryData = id ? userLibrary.data : ownLibrary.data;
  const loading = id ? userLibrary.loading : ownLibrary.loading;
  const error = id ? null : ownLibrary.error;

  const [sortBy, setSortBy] = useState<keyof Game>("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (newSortBy: string, newOrder: "asc" | "desc") => {
    setSortBy(newSortBy as keyof Game);
    setOrder(newOrder);
  };

  const games = libraryData.map((library) => library.gameId);
  const sortedGames = useSort(games, sortBy, order);

  if (loading) {
    return <p className={styles.status}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.status}>Error: {error}</p>;
  }

  return (
    <section className={styles.library}>
      <div className={styles.header}>
        <h2>Library</h2>
        <div className={styles.controls}>
          <GameSort
            sortBy={sortBy}
            order={order}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {sortedGames.length === 0 ? (
        <p className={styles.empty}>No games in library yet.</p>
      ) : (
        <GameList games={sortedGames} />
      )}

      <Link to="/profile" className={styles.backLink}>
        Back to profile
      </Link>
    </section>
  );
}

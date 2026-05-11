import { Link, useParams } from "react-router-dom";
import GameSort from "../../components/games/gameSort/GameSort";
import { useSort } from "../../hooks/useSort";
import { useLibrary } from "../../contexts/LibraryContext";
import { GameList } from "../../components/games/GameList";
import { useState } from "react";
import type { Game } from "../../types/game";
import { useUserLibrary } from "../../hooks/useUserLibrary";

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

  // extracts games-objects from library-entries, maps all games
  const games = libraryData.map((library) => library.gameId);
  const sortedGames = useSort(games, sortBy, order);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <section>
      <h2>Library</h2>
      <GameSort sortBy={sortBy} order={order} onSortChange={handleSortChange} />

      <GameList games={sortedGames} />
      <br />
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

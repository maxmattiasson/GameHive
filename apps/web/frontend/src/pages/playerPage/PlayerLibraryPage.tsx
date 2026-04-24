import { Link } from "react-router-dom";
import GameSort from "../../components/games/gameSort/GameSort";
import { useSort } from "../../hooks/useSort";
import { useLibrary } from "../../hooks/useLibrary";
import { GameList } from "../../components/games/GameList";
import { useState } from "react";
import type { Game } from "../../types/game";

export function PlayerLibraryPage() {
  const { data } = useLibrary();
  const [sortBy, setSortBy] = useState<keyof Game>("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (newSortBy: string, newOrder: "asc" | "desc") => {
    setSortBy(newSortBy as keyof Game);
    setOrder(newOrder);
  };

  const games = data.map((library) => library.gameId);
  const sortedGames = useSort(games, sortBy, order);

  return (
    <section>
      <h1>Player Library</h1>
      <GameSort sortBy={sortBy} order={order} onSortChange={handleSortChange} />
      <GameList games={sortedGames} />
      <br />
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

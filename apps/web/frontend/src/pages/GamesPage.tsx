import { useState } from "react";
import GameFilter from "../components/games/gameFilter/GameFilter";
import { GameList } from "../components/games/GameList";
import type { GameFilterValues } from "../types/gameFilter";
import { useGames } from "../hooks/useGames";

const initialFilters: GameFilterValues = {
  title: "",
  genre: [],
  dev: "",
  release: "",
  multiplayer: false,
};

export function GamesPage() {
  const [activeFilters, setActiveFilters] =
    useState<GameFilterValues>(initialFilters);
  const { data, loading, error } = useGames();

  // filters values and returns boolean
  const filteredGames = data.filter((game) => {
    const titleMatch = game.title
      .toLowerCase()
      .includes(activeFilters.title.toLowerCase().trim());

    const devMatch = game.dev
      .toLocaleLowerCase()
      .includes(activeFilters.dev.toLocaleLowerCase().trim());

    // const releaseYear = new Date(game.release).getFullYear().toString();
    // const releaseMatch =
    //   activeFilters?.release.trim() === "" ||
    //   releaseYear.includes(activeFilters.release.trim());

    const genreMatch =
      activeFilters?.genre.length === 0 ||
      activeFilters?.genre.some((selectedGenre) =>
        game.genres.some((g) => g.name === selectedGenre),
      );

    const multiplayerMatch = !activeFilters?.multiplayer || game.multiplayer;

    return titleMatch && devMatch && genreMatch && multiplayerMatch;
  });
  return (
    <>
      <p>Hush! 🤫 You're in a library... </p>
      <h1>OUR GAMES LIBRARY!! 🥳🎮🕹️👾</h1>

      <p>(Tons and tons of games here....)</p>
      <div className="game-filter-wrapper">
        <GameFilter onSearch={setActiveFilters} />
        <GameList games={filteredGames} />
      </div>
    </>
  );
}

import { useState } from "react";
import GameFilter from "../components/games/gameFilter/GameFilter";
import { GameList } from "../components/games/GameList";
import type { GameFilterValues } from "../types/gameFilter";
import { useGames } from "../hooks/useGames";
import "./GamePage.css";
import Button from "../components/ui/Button";

const PAGE_SIZE = 18;

const initialFilters: GameFilterValues = {
  title: "",
  genre: [],
  dev: "",
  release: "",
  multiplayer: false
};

export function GamesPage() {
  const [activeFilters, setActiveFilters] =
    useState<GameFilterValues>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGames();

  // filters values and returns boolean
  const filteredGames = data.filter((game) => {
    const titleMatch = game.title
      .toLowerCase()
      .includes(activeFilters.title.toLowerCase().trim());

    const devMatch = game.dev
      .toLocaleLowerCase()
      .includes(activeFilters.dev.toLocaleLowerCase().trim());

    const genreMatch =
      activeFilters?.genre.length === 0 ||
      activeFilters?.genre.some((selectedGenre) =>
        game.genres.some((g) => g.name === selectedGenre)
      );

    const multiplayerMatch = !activeFilters?.multiplayer || game.multiplayer;

    return titleMatch && devMatch && genreMatch && multiplayerMatch;
  });

  const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentGames = filteredGames.slice(start, start + PAGE_SIZE);
  return (
    <>
      <div className="gamepage-container">
        <h2>Browse Catalogue</h2>
        <div className="game-filter-wrapper">
          <GameFilter onSearch={setActiveFilters} />
          <GameList games={currentGames} compact />
        </div>
        <div className="button-wrapper">
          <Button
            color="primary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            color="primary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

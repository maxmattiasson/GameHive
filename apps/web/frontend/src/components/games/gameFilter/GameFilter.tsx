import { useState } from "react";
import type { GameFilterValues } from "../../../types/gameFilter";

type GameFilterProps = {
  onSearch: (filters: GameFilterValues) => void;
};

const genres = [
  "Action",
  "Shooter",
  "RPG",
  "Adventure",
  "Sports",
  "Battle Royale",
  "Simulation",
  "Strategy",
  "Open World",
  "Survival",
  "Racing",
  "Sandbox",
  "Horror",
  "Fighting",
  "MMO",
  "Roguelike",
  "MOBA",
  "Card Game",
  "Stealth",
  "Party",
  "Puzzle"
];

// startvalue for game filter
const initialFilter: GameFilterValues = {
  title: "",
  genre: [],
  dev: "",
  release: "",
  multiplayer: false
};

const GameFilter = ({ onSearch }: GameFilterProps) => {
  const [filter, setFilter] = useState<GameFilterValues>(initialFilter);

  // updates field dynamic.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // checkes value and checked, enables multi-select
  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      genre: checked
        ? [...prev.genre, value]
        : prev.genre.filter((g) => g !== value)
    }));
  };

  // check if checked
  const handleMultiplayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, multiplayer: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filter);
  };

  // resets filter on UI and parent component
  const handleReset = () => {
    setFilter(initialFilter);
    onSearch(initialFilter);
  };

  return (
    <form className="search-filter-container" onSubmit={handleSubmit}>
      <h2>Search Filter</h2>

      <input
        name="title"
        type="text"
        value={filter.title}
        onChange={handleInputChange}
        placeholder="Search title"
      />

      <div>
        <p>Genres</p>
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              value={genre}
              checked={filter.genre.includes(genre)}
              onChange={handleGenreChange}
            />
            {genre}
          </label>
        ))}
      </div>

      <label>
        <input
          type="checkbox"
          checked={filter.multiplayer}
          onChange={handleMultiplayerChange}
        />
        Multiplayer
      </label>

      <input
        name="dev"
        type="text"
        value={filter.dev}
        onChange={handleInputChange}
        placeholder="Search Developer"
      />

      <input
        name="release"
        type="text"
        value={filter.release}
        onChange={handleInputChange}
        placeholder="Release year, ex 2024"
      />

      <button type="submit">Search</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};
export default GameFilter;

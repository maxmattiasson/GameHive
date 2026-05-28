import { useState } from "react";
import type { GameFilterValues } from "../../../types/gameFilter";
import styles from "./GameFilter.module.css";
import Button from "../../ui/Button";

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
  "MOBA",
  "Stealth",
  "Puzzle"
];

const initialFilter: GameFilterValues = {
  title: "",
  genre: [],
  dev: "",
  release: "",
  multiplayer: false
};

const GameFilter = ({ onSearch }: GameFilterProps) => {
  const [filter, setFilter] = useState<GameFilterValues>(initialFilter);
  const [showGenres, setShowGenres] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      genre: checked
        ? [...prev.genre, value]
        : prev.genre.filter((g) => g !== value)
    }));
  };

  const handleMultiplayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, multiplayer: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filter);
  };

  const handleReset = () => {
    setFilter(initialFilter);
    onSearch(initialFilter);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Search Filter</h3>

      <div className={styles.row}>
        <input
          className={styles.input}
          name="title"
          type="text"
          value={filter.title}
          onChange={handleInputChange}
          placeholder="Search title"
        />
        <input
          className={styles.input}
          name="dev"
          type="text"
          value={filter.dev}
          onChange={handleInputChange}
          placeholder="Search developer"
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filter.multiplayer}
            onChange={handleMultiplayerChange}
          />
          Multiplayer
        </label>
        <Button
          color="secondary"
          type="button"
          aria-expanded={showGenres}
          onClick={() => setShowGenres((v) => !v)}
        >
          {showGenres ? "Hide genre" : "Show genre"}
        </Button>
      </div>

      {showGenres && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Genre</legend>
          {genres.map((genre) => (
            <label key={genre} className={styles.genreLabel}>
              <input
                type="checkbox"
                value={genre}
                checked={filter.genre.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          ))}
        </fieldset>
      )}

      <div className={styles.actions}>
        <Button color="secondary" type="submit">
          Search
        </Button>
        <Button color="secondary" type="button" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default GameFilter;

import type { Game } from "../../../types/game";

type GameSortProps = {
  sortBy: string;
  order: "asc" | "desc";
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
};

const GameSort: React.FC<GameSortProps> = ({ sortBy, order, onSortChange }) => (
  <div>
    <label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as keyof Game, order)}
      >
        <option value="title">Title</option>

        <option value="release">Release</option>
      </select>
      <button
        onClick={() => onSortChange(sortBy, order === "asc" ? "desc" : "asc")}
      >
        {order === "asc" ? "⬆" : "⬇"}
      </button>
    </label>
  </div>
);
export default GameSort;

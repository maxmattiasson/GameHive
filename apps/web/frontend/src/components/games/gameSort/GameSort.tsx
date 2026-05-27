import type { Game } from "../../../types/game";
import Button from "../../ui/Button";

type GameSortProps = {
  sortBy: string;
  order: "asc" | "desc";
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
};

// Sort by alphabetical order or release date, ascending or descending.
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
      <Button
        color="primary"
        onClick={() => onSortChange(sortBy, order === "asc" ? "desc" : "asc")}
      >
        {order === "asc" ? "⬆" : "⬇"}
      </Button>
    </label>
  </div>
);
export default GameSort;

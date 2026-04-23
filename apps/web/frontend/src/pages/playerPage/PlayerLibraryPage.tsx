import { Link } from "react-router-dom";

import { useLibrary } from "../../hooks/useLibrary";
import { GameList } from "../../components/games/GameList";

export function PlayerLibraryPage() {
  const { data } = useLibrary();

  return (
    <section>
      <h1>Player Library</h1>

      <GameList games={data.map((library) => library.gameId)} />
      <br />
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

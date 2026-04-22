import { Link } from "react-router-dom";

import { useLibrary } from "../../hooks/useLibrary";

export function PlayerLibraryPage() {
  const { data } = useLibrary();

  return (
    <section>
      <h1>Player Library</h1>

      {data.map((library) => (
        <p key={library._id}>{library.gameId.title}</p>
      ))}
      <br />
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

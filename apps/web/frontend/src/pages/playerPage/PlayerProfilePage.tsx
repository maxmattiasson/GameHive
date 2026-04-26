import { Link } from "react-router-dom";

export function PlayerProfile() {
  return (
    <div>
      <h1>Player Profile</h1>
      <p>
        <Link to="/profile/friends">Friends</Link>
      </p>
      <p>
        <Link to="/profile/achivements">Achivements</Link>
      </p>
      <p>
        <Link to="/profile/library">Library</Link>
      </p>
    </div>
  );
}

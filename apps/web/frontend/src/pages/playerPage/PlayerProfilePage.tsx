import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PlayerProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Player Profile</h1>
      <p>Welcome {user?.username}</p>
      <br />
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

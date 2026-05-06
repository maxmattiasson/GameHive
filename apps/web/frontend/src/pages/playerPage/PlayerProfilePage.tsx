import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./PlayerProfilePage.css";

export function PlayerProfile() {
  const { user } = useAuth();
  return (
    <div className="player-profile">
      <h1>Player Profile</h1>
      <p>Welcome {user?.username}</p>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJ09O7DcXW62RYeG11IAOVukc5tNBerllXA&s" />
      </div>
      <br />
      <ul>
        <li>
          <Link to="/profile/friends">Friends</Link>
        </li>
        <li>
          <Link to="/profile/achivements">Achivements</Link>
        </li>
        <li>
          <Link to="/profile/library">Library</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

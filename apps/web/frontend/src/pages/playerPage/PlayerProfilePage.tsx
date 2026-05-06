import { Outlet, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./PlayerProfilePage.css";

export function PlayerProfile() {
  const { user } = useAuth();
  const { id } = useParams();
  console.log(id);
  return (
    <div className="player-profile section">
      <div className="player-header border-10">
        <div>
          {id ? <h1>{id}</h1> : <h1>{user?.username}</h1>}
          <p>Player Profile</p>
        </div>
        <div className="player-img">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJ09O7DcXW62RYeG11IAOVukc5tNBerllXA&s" />
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="/profile/friends">Friends</NavLink>
        </li>
        <li>
          <NavLink to="/profile/achivements">Achivements</NavLink>
        </li>
        <li>
          <NavLink to="/profile/library">Library</NavLink>
        </li>
      </ul>
      <div className="profile-section border-10">
        <Outlet />
      </div>
    </div>
  );
}

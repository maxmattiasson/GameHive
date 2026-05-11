import { Outlet, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "./PlayerProfilePage.css";

export function PlayerProfile() {
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();

  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setOtherUser(data));
  }, [id]);

  if (id && !authLoading && !user) {
    return (
      <div className="player-profile section">
        <div className="player-header border-10">
          <p>Log in to view other players' profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-profile section">
      <div className="player-header border-10">
        <div>
          {id ? (
            <h1>{otherUser?.username ?? "Loading..."}</h1>
          ) : (
            <h1>{user?.username}</h1>
          )}
          <p>Player Profile</p>
        </div>
        <div className="player-img">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJ09O7DcXW62RYeG11IAOVukc5tNBerllXA&s" />
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="library">Library</NavLink>
        </li>
        <li>
          <NavLink to="friends">Friends</NavLink>
        </li>
        <li>
          <NavLink to="achievements">Achievements</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <div className="profile-section border-10">
        <Outlet />
      </div>
    </div>
  );
}

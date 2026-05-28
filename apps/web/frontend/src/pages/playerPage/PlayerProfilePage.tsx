import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import RemoveButton from "../../components/ui/RemoveButton";
import deleteUser from "../../services/userService";
import { AddFriendButton } from "../../components/ui/AddFriendButton";
import styles from "./PlayerProfile.module.css";

export function PlayerProfile() {
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();

  const [otherUser, setOtherUser] = useState<any>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleDeleteUser = async (id: string) => {
    console.log(id);
    try {
      await deleteUser(id);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setOtherUser(data));
  }, [id]);

  if (id && !authLoading && !user) {
    return (
      <div className={`${styles.playerProfile} ${styles.loggedOut}`}>
        <div className={styles.playerHeader}>
          <p>Log in to view other players&apos; profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playerProfile}>
      <div className={styles.playerHeader}>
        <div className={styles.playerHeaderInfo}>
          {id ? (
            <h1>{otherUser?.username ?? "Loading..."}</h1>
          ) : (
            <h1>{user?.username}</h1>
          )}
          {id && <AddFriendButton userId={id} />}
          <p>Player Profile</p>
        </div>
        <div className={styles.playerImg}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJ09O7DcXW62RYeG11IAOVukc5tNBerllXA&s"
            alt="Player avatar"
          />
        </div>
      </div>

      <ul className={styles.nav}>
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

      <div className={styles.profileSection}>
        <Outlet />
      </div>
      {isAdmin && (
        <div className="container">
          <RemoveButton id={id} onDelete={handleDeleteUser}>
            Die
          </RemoveButton>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect, type ChangeEvent } from "react";
import RemoveButton from "../../components/ui/RemoveButton";
import deleteUser from "../../services/userService";
import { AddFriendButton } from "../../components/ui/AddFriendButton";
import styles from "./PlayerProfile.module.css";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";

export function PlayerProfile() {
  const { user, setUser, loading: authLoading, logout } = useAuth();
  const { id: slug } = useParams();
  const id = slug?.match(/[0-9a-f]{24}$/i)?.[0];

  const [otherUser, setOtherUser] = useState<any>(null);

  const [error, setError] = useState("");

  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.avatar ?? "avatar1"
  );
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const isOwnProfile = !id || user?._id === id;
  const displaydAvatar = id ? (otherUser?.avatar ?? "avatar1") : selectedAvatar;

  const handleDeleteUser = async (id: string) => {
    console.log(id);
    try {
      await deleteUser(id);
      await logout()
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  };

  const handleAvatarSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    const avatar = event.currentTarget.value;
    setSelectedAvatar(avatar);
  };

  useEffect(() => {
    if (!id && user?.avatar) {
      setSelectedAvatar(user.avatar);
    }
  }, [id, user?.avatar]);
  useEffect(() => {
    setShowAvatarPicker(false);
  }, [id]);

  const onSaveAvatar = async () => {
    try {
      const res = await fetch("/api/users/me/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ avatar: selectedAvatar })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Could not set avatar");
        return;
      }

      if (user) {
        setUser({
          ...user,
          avatar: data.user.avatar
        });
      }

      setError("");
      setShowAvatarPicker(false);
    } catch (error) {
      setError("Something went wrong with saving avatar");
    }
  };

  const handleChangeAvatar = () => {
    if (!isOwnProfile) return;
    setShowAvatarPicker((prev) => !prev);
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
          {id && otherUser?.role === "user" && user?.role === "user" && (
            <AddFriendButton userId={id} />
          )}
          <p>Player Profile</p>
        </div>
        <div className={styles.playerImg}>
          <img src={`/images/${displaydAvatar}.jpg`} alt="Player avatar" />
          {isOwnProfile && (
            <Button color="secondary" onClick={handleChangeAvatar}>
              Change Avatar
            </Button>
          )}
          {isOwnProfile && showAvatarPicker && (
            <div className="select_avatar_wrapper">
              <Avatar
                value={selectedAvatar}
                onAvatarSelect={handleAvatarSelect}
              />
              <Button onClick={onSaveAvatar} color="primary">
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      { otherUser?.role !== "dev" && (
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
      )}
      
      <div className={styles.profileSection}>
        <Outlet />
      </div>
      {isAdmin && (
        <div className="container">
          <RemoveButton id={id} onDelete={handleDeleteUser}>
            Delete User
          </RemoveButton>
          <p>{error}</p>
        </div>
      )}
      { ((user && !id) || (user && id && user._id === id)) && (
        <div className="container">
          <RemoveButton self={user._id} onDelete={handleDeleteUser}>
            Delete my account
          </RemoveButton>
          <p>{error}</p>
        </div>
      )
      }
    </div>
  );
}

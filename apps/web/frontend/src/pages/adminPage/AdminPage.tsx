import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UsersSearchField from "../../components/ui/UsersSearchField";
import styles from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import type { Game } from "../../types/game";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers)
      .catch(console.error);
    fetch("/api/games")
      .then((r) => r.json())
      .then(setGames)
      .catch(console.error);
  }, [loading, user, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.titleBlock}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
        <p className={styles.subheading}>
          Logged in as{" "}
          <span className={styles.adminName}>{user?.username}</span>
        </p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{users.length}</span>
          <span className={styles.statLabel}>Total Users</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{games.length}</span>
          <span className={styles.statLabel}>Games Listed</span>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>User search</h2>
        <p className={styles.sectionDesc}>
          Search for a user by username to view their profile.
        </p>
        <UsersSearchField />
      </div>
    </div>
  );
};

export default AdminPage;

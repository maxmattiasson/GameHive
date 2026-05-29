import styles from "./Header.module.css";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { Notifications } from "./Notifications";

export function Header() {
  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  const profilePath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "dev"
        ? "/dev/profile"
        : "/profile";

  if (loading) return null;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Game Hive
      </Link>
      <nav className={styles.nav}>
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>
        <NavLink to="/games" className={navClass}>
          Games
        </NavLink>
      </nav>
      {user ? (
        <div className={styles.userArea}>
          <Notifications />
          <NavLink to={profilePath} className={styles.profileLink}>
            {user.username}
          </NavLink>
          <Button color="vote" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <LoginForm />
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </header>
  );
}

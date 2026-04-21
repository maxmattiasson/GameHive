import "./HeaderTwo.css";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";

export function HeaderTwo() {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // navigera någonstans efter logout eller annat  ?
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  const profilePath = user?.role === "dev" ? "/dev/profile" : "/profile";

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <header>
        <h1>Game Hive</h1>
        <nav>
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/games" className={navClass}>
            Games
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
        </nav>
        {user ? (
          <div>
            <NavLink to={profilePath} className="profile-link">
              {user.username}
            </NavLink>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="login-container">
            <LoginForm />
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </header>
    </>
  );
}

import "./Header.css";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export function Header() {
  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  const profilePath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "dev"
        ? "/dev/profile"
        : "/profile";

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
          {/*    <NavLink to="/about" className={navClass}>
            About
          </NavLink> */}
        </nav>
        {user ? (
          <div>
            <NavLink to={profilePath} className="profile-link">
              {user.username}
            </NavLink>
            <Button color="vote" onClick={handleLogout}>
              Log out
            </Button>
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

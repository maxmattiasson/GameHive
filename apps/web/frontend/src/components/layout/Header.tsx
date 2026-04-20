import "./Header.css"
import LoginForm from "../auth/LoginForm"
import { useAuth } from "../../hooks/useAuth"
import { NavLink } from "react-router-dom";

export function Header() {
    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        // navigera någonstans efter logout eller annat  ?
   };

   const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

   const profilePath = user?.role === "dev" ? "/dev/profile" : "/profile";

    if (loading) return <p>Loading...</p>

    return(
        <>
            <header>
                <div className="logo-container">
                    <h1>Game Hive</h1>
                </div>
                <div className="user-container">

        {user ?  (
            <div>
                <NavLink to={profilePath} className="profile-link">
                    {user.username}
                </NavLink>
                <button onClick={handleLogout }>Logout</button>
            </div>
            ) : (
            <LoginForm />
            ) }    
                </div>
                <div className="nav-container">
                    <NavLink to="/" end className={navClass}>Home</NavLink>
                    <NavLink to="/games" className={navClass}>Games</NavLink>
                    <NavLink to="/about" className={navClass}>About</NavLink>
                </div>
            </header>
        </>
    )
}
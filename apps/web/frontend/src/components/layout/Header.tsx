import "./Header.css"
import LoginForm from "../auth/LoginForm"
import { useAuth } from "../../hooks/useAuth"

export function Header() {

    const { user, loading, setUser } = useAuth();


    const handleLogout = async () => {
        await fetch("http://localhost:3000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setUser(null);
      };

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
                <span>{user.username}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
            ) : (
            <LoginForm />
            ) }    
                </div>
                <div className="nav-container">
                    <a href="/">Home</a>
                    <a href="/games">Games</a>
                    <a href="/">About</a>
                </div>
            </header>
        </>
    )
}
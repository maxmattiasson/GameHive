import "./Header.css"
import LoginForm from "../auth/LoginForm"

export function Header() {
    return(
        <>
            <header>
                <div className="logo-container">
                    <h1>Game Hive</h1>
                </div>
                <div className="user-container">
                    <LoginForm />
                </div>
                <div className="nav-container">
                    <span>Home</span>
                    <span>Games</span>
                    <span>About</span>
                </div>
            </header>
        </>
    )
}
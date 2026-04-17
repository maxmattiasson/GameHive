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
                    <a href="/">Home</a>
                    <a href="/games">Games</a>
                    <a href="/">About</a>
                </div>
            </header>
        </>
    )
}
import "./Header.css"

export function Header() {
    return(
        <>
            <header>
                <div className="logo-container">
                    <h1>Game Hive</h1>
                </div>
                <div className="nav-container">
                    <span>Home</span>
                    <span>Games</span>
                    <span>About</span>
                </div>
                <div className="user-container">
                    Sign up/Log in
                </div>
            </header>
        </>
    )
}
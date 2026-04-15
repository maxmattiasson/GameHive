import "./App.css"
import { GameList } from "./components/games/GameList"

function App() {
  return (
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
      
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        Eyyoo
      </h1>
      <div className="center">
        <GameList limit={3} />
      </div>
      <footer>
        { /* About: List of links to info articles */ }
        
        {/* Contact: List of contact paths to the site developers */}
      </footer>
    
    </>
  )
}

export default App

import "./App.css"
import { GameList } from "./components/games/GameList"

function App() {
  return (
    <>
      // Header component here!
      <header>
        // Logo
        <div>
          <h1>Game Hive</h1>
        </div>
        // Nav
        <div>
          <span>Home</span>
          <span>Games</span>
          <span>About</span>
        </div>
        // User menu (Login/Logout, avatar, screen name, menu button)
        <div>
          Sign up/Log in
        </div>
      </header>
      // Move ^^this^^ into Header component, or not? 
      
      // Page component here!
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
      // Move ^^this^^ into Home(?) component // Footer component here!
      <footer>
        // About: List of links to info articles 
        
        // Contact: List of contact paths to the site developers
      </footer>
      // Move ^^this^^ into Footer component, or not?
    
    </>
  )
}

export default App

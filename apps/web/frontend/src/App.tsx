import "./App.css";
import { GameList } from "./components/games/GameList";
import { Route, Routes } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";

function App() {
  return (
    <>
      <header>
        <div>
          <h1>Game Hive</h1>
        </div>
        <div>
          <span>Home</span>
          <span>Games</span>
          <span>About</span>
        </div>
        <div>Sign up/Log in</div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="center">
              <GameList limit={3} />
            </div>
          }
        />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>

      <footer>
        {/* About: List of links to info articles */}

        {/* Contact: List of contact paths to the site developers */}
      </footer>
    </>
  );
}

export default App;

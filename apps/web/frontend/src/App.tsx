import "./App.css"
import { Header } from "./components/layout/Header"
import { GameList } from "./components/games/GameList"
import { Route, Routes } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";
import { GamesPage } from "./pages/GamesPage";

function App() {
  return (
    <>
      <Header />
      
      <main>

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
          <Route
            path="/games"
            element={
              <GamesPage />
            }
            />
        </Routes>

      </main>
      
      <footer>
        {/* About: List of links to info articles */}

        {/* Contact: List of contact paths to the site developers */}
      </footer>
    </>
  );
}

export default App;

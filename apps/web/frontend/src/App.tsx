import "./App.css";
import { Header } from "./components/layout/Header";
import { GameList } from "./components/games/GameList";
import { Route, Routes } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";
import { GamesPage } from "./pages/GamesPage";
import { useGames } from "./hooks/useGames";
import { PlayerProfile } from "./pages/playerPage/PlayerProfilePage";
import { PlayerLibraryPage } from "./pages/playerPage/PlayerLibraryPage";
import { PlayerAchivementsPage } from "./pages/playerPage/PlayerAchivementsPage";
import { PlayerFriendsPage } from "./pages/playerPage/PlayerFriendsPage";

function App() {
  const { data, loading, error } = useGames();

  const games = data.slice(0, 3); //slice array to limit, otherwise return all
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="center">
                <GameList games={games} />
              </div>
            }
          />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/profile" element={<PlayerProfile />} />
          <Route path="/profile/library" element={<PlayerLibraryPage />} />
          <Route
            path="/profile/achivements"
            element={<PlayerAchivementsPage />}
          />
          <Route path="/profile/friends" element={<PlayerFriendsPage />} />
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

import "./App.css";
import { Header } from "./components/layout/Header";
import { GameList } from "./components/games/GameList";
import { Route, Routes, Navigate } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";
import { GamesPage } from "./pages/GamesPage";
import { useGames } from "./hooks/useGames";
import DevProfilePage from "./pages/DevProfilePage";
import { PlayerProfile } from "./pages/playerPage/PlayerProfilePage";
import { PlayerLibraryPage } from "./pages/playerPage/PlayerLibraryPage";
import { PlayerachievementsPage } from "./pages/playerPage/PlayerAchievementsPage";
import { PlayerFriendsPage } from "./pages/playerPage/PlayerFriendsPage";
import { SignupPage } from "./pages/signup/SignupPage";
import { LibraryProvider } from "./contexts/LibraryContext";

function App() {
  const { data } = useGames();

  const games = data.slice(0, 3); //slice array to limit, otherwise return all
  return (
    <>
      <LibraryProvider>
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
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dev/profile" element={<DevProfilePage />} />

            {/* Profile */}
            <Route path="/profile" element={<PlayerProfile />}>
              <Route index element={<Navigate to="library" replace />} />
              <Route path="library" element={<PlayerLibraryPage />} />
              <Route path="achievements" element={<PlayerachievementsPage />} />
              <Route path="friends" element={<PlayerFriendsPage />} />
            </Route>

            {/* Other player profile */}
            <Route path="/players/:id" element={<PlayerProfile />}>
              <Route path="library" element={<PlayerLibraryPage />} />
              <Route path="achievements" element={<PlayerachievementsPage />} />
              <Route path="friends" element={<PlayerFriendsPage />} />
            </Route>
          </Routes>
        </main>

        <footer>
          {/* About: List of links to info articles */}

          {/* Contact: List of contact paths to the site developers */}
        </footer>
      </LibraryProvider>
    </>
  );
}

export default App;

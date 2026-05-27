import "./App.css";
import { Header } from "./components/layout/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";
import { GamesPage } from "./pages/GamesPage";
import { HomePage } from "./pages/homePage/HomePage";
import DevProfilePage from "./pages/DevProfilePage";
import { PlayerProfile } from "./pages/playerPage/PlayerProfilePage";
import { PlayerLibraryPage } from "./pages/playerPage/PlayerLibraryPage";
import { PlayerachievementsPage } from "./pages/playerPage/PlayerAchievementsPage";
import { PlayerFriendsPage } from "./pages/playerPage/PlayerFriendsPage";
import { SignupPage } from "./pages/signup/SignupPage";
import { LibraryProvider } from "./contexts/LibraryContext";
import { PlayerReviewsPage } from "./pages/playerPage/PlayerReviewsPage";
import AdminPage from "./pages/adminPage/AdminPage";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <LibraryProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dev/profile" element={<DevProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Profile */}
            <Route path="/profile" element={<PlayerProfile />}>
              <Route index element={<Navigate to="library" replace />} />
              <Route path="library" element={<PlayerLibraryPage />} />
              <Route path="achievements" element={<PlayerachievementsPage />} />
              <Route path="friends" element={<PlayerFriendsPage />} />
              <Route path="reviews" element={<PlayerReviewsPage />} />
            </Route>

            {/* Other player profile */}
            <Route path="/users/:id" element={<PlayerProfile />}>
              <Route index element={<Navigate to="library" replace />} />
              <Route path="library" element={<PlayerLibraryPage />} />
              <Route path="achievements" element={<PlayerachievementsPage />} />
              <Route path="friends" element={<PlayerFriendsPage />} />
              <Route path="reviews" element={<PlayerReviewsPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </LibraryProvider>
    </>
  );
}

export default App;

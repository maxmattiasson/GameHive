import "./App.css"
import { Header } from "./components/layout/Header"
import { GameList } from "./components/games/GameList"
import { Route, Routes } from "react-router-dom";
import { GameDetails } from "./pages/GameDetails";

function App() {
  return (
    <>
      <Header />

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

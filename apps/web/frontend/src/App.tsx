import "./App.css";
import { GameList } from "./components/games/GameList";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

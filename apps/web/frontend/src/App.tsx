import "./App.css";
import { GameList } from "./components/GameList";

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
      <GameList />
    </>
  );
}

export default App;

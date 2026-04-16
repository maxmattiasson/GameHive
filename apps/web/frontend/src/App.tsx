import "./App.css"
import { Header } from "./components/layout/Header"
import { GameList } from "./components/games/GameList"

function App() {
  return (
    <>
      <Header />
     
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

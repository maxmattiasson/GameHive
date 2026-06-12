import { useAuth } from "../hooks/useAuth";
import DevGameForm from "../components/games/DevGameForm/DevGameForm";
import { useState, useEffect } from "react";
import DevGamesList from "../components/games/DevGamesList/DevGamesList";
import { getDevsOwnGames, deleteGame } from "../services/gameService";
import type { Game } from "../types/game";
import styles from "./DevProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function DevProfilePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "dev") {
      navigate("/");
      return;
    }
    const fetchGames = async () => {
      try {
        const data = await getDevsOwnGames();
        setGamesList(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, [loading, user, navigate]);

  const handleEdit = (game: Game) => {
    setSelectedGame(game);
    setIsUploading(true);
  };

  const handleFormSuccess = (savedGame: Game) => {
  if (selectedGame) {
    setGamesList((prev) =>
      prev.map((game) =>
        game._id === savedGame._id ? savedGame : game
      )
    );
  } else {
    setGamesList((prev) => [savedGame, ...prev]);
  }
  setSelectedGame(null);
  setIsUploading(false);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteGame(id);
      setGamesList((prev) => prev.filter((game) => game._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleForm = () => {
    setSelectedGame(null);
    setIsUploading((prev) => !prev);
  };

  return (
    <section className={styles.page}>
      <div>
        <h1 className={styles.heading}>Dev Page</h1>
        <p className={styles.username}>{user?.username}</p>
      </div>

      <Button color="primary" onClick={handleToggleForm}>
        {isUploading ? "Cancel" : "Upload game"}
      </Button>

      {isUploading && (
        <DevGameForm
          key={selectedGame?._id ?? "new"}
          selectedGame={selectedGame}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className={styles.gameList}>
        <DevGamesList
          onDelete={handleDelete}
          onEdit={handleEdit}
          games={gamesList}
        />
      </div>
    </section>
  );
}

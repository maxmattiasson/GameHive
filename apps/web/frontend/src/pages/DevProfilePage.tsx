import { useAuth } from "../hooks/useAuth";
import DevGameForm from "../components/games/DevGameForm/DevGameForm";
import { useState, useEffect } from "react";
import DevGamesList from "../components/games/DevGamesList/DevGamesList";
import { getDevsOwnGames } from "../services/gameService";
import type { Game } from "../types/game";

export default function DevProfilePage(){
    const [isUploading, setIsUploading] = useState(false);
    const [gamesList, setGamesList] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!user) return;

        const fetchGames = async () => {
            try {
                const data = await getDevsOwnGames();
                setGamesList(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchGames();
    },[loading, user])

    const handleEdit = (game: Game) => {
        setSelectedGame(game);
        setIsUploading(true);
      };
    
    const handleDelete = async (id: string) => {
    console.log("deleted game with id:", id);
    // await deleteGame(id)
    // setGamesList(prev => prev.filter(game => game._id !== id))
    };

    const handleToggleForm = () => {
        setSelectedGame(null);
        setIsUploading((prev) => !prev);
      };

    return (
        <>
            <h1>DEV PAGE</h1>
            <p>{user?.username}</p>

            <button onClick={handleToggleForm}>Upload game</button>

            {isUploading && <DevGameForm selectedGame={selectedGame} />}

            <DevGamesList onDelete={handleDelete} onEdit={handleEdit} games={gamesList}/>

        </>
    )
}
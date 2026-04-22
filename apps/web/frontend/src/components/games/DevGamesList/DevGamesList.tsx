import { useEffect, useState } from "react"
import { getDevsOwnGames } from "../../../services/gameService";
import type { Game } from "../../../types/game";
import { useAuth } from "../../../hooks/useAuth";

export default function DevGamesList(){
    const [gamesList, setGamesList] = useState<Game[]>([]);
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

    return (
        <div>
            {gamesList.length === 0 ? (
                <p>No games yet</p>
            ) : (
                gamesList.map((game) => (
                <div key={game._id}>{game.title}</div>
                ))
            )}
        </div>
    )
}
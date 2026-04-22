import { useAuth } from "../hooks/useAuth";
import CreateGameForm from "../components/games/CreateGameForm/CreateGameForm";

export default function DevProfilePage(){

    const { user } = useAuth();

    return (
        <>
            <h1>DEV PAGE</h1>
            <p>{user?.username}</p>
            <div>list of owned games</div>
            <div>add game</div>
            <CreateGameForm/>
        </>
    )
}
import { useAuth } from "../hooks/useAuth";
import CreateGameForm from "../components/games/CreateGameForm/CreateGameForm";
import { useState } from "react";
import DevGamesList from "../components/games/DevGamesList/DevGamesList";

export default function DevProfilePage(){
    const [isUploading, setIsUploading] = useState(false);

    const { user } = useAuth();

    return (
        <>
            <h1>DEV PAGE</h1>
            <p>{user?.username}</p>

            <button onClick={() => setIsUploading(!isUploading)}>Upload game</button>
            {isUploading ? <CreateGameForm/> : '' }

            <DevGamesList/>
            
        </>
    )
}
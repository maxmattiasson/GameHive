import { useAuth } from "../hooks/useAuth";

export default function DevProfilePage(){

    const { user } = useAuth();

    return (
        <>
            <h1>DEV PAGE</h1>
            <p>{user?.username}</p>
        </>
    )
}
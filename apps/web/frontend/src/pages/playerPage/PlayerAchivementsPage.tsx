import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export function PlayerAchivementsPage() {
  const { user } = useAuth()
  

  return (
    <section>
      <h1>{user?.username || "Player"}'s Achievements</h1>
      <p>Gloat on your accomplishments so far!</p>
      { /* map out all achievements of user in a ul */ }
      { user?.userAchievements && (
        <ul>
          {user.userAchievements.map((ach, index) => (
            <li key={index}>{ach}</li>
          ))}
        </ul>
      ) }
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

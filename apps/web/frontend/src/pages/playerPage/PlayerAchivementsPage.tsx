import { Link } from "react-router-dom";

export function PlayerAchivementsPage() {
  return (
    <section>
      <h1>Player Achivements</h1>
      <p>Your achivements here</p>
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

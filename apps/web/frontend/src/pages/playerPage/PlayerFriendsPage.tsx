import { Link } from "react-router-dom";

export function PlayerFriendsPage() {
  return (
    <section>
      <h1>Player Friends</h1>
      <p>Your friends here</p>
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

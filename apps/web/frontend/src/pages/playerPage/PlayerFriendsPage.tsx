import { Link } from "react-router-dom";

export function PlayerFriendsPage() {
  return (
    <section>
      <h2>Friends</h2>
      <p>Your friends here</p>

      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

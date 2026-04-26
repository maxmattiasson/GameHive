import React from "react";
import { Link } from "react-router-dom";

export function PlayerLibraryPage() {
  return (
    <section>
      <h1>Player Library</h1>
      <p>Your games here</p>
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}

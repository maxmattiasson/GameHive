import { useState, useEffect } from "react";
import { sendFriendRequest } from "../../services/friendshipService";
import Button from "./Button";

interface Props {
  userId: string;
}

export function AddFriendButton({ userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [userId]);

  async function handleClick() {
    setLoading(true);
    setMessage("");
    try {
      await sendFriendRequest(userId);
      setMessage("Friend request sent");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Could not send friend request",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button color="primary" disabled={loading} onClick={handleClick}>
        {loading ? "Sending..." : "Add Friend"}
      </Button>
      {message && <p>{message}</p>}
    </>
  );
}

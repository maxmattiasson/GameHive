import { useState } from "react";
import { sendFriendRequest } from "../../services/friendshipService";
import Button from "./Button";

interface Props {
  userId: string;
}
export function AddFriendButton({ userId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await sendFriendRequest(userId);
    setLoading(false);
  }

  return (
    <Button color="primary" disabled={loading} onClick={handleClick}>
      Add Friend
    </Button>
  );
}

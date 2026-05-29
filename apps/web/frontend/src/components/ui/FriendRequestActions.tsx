import { useState } from "react";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../services/friendshipService";
import Button from "./Button";

interface Props {
  requestId: string;
  onAction: () => void;
}

export function FriendRequestActions({ requestId, onAction }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    setLoading(true);
    await acceptFriendRequest(requestId);
    setLoading(false);
    onAction();
  }

  async function handleReject() {
    setLoading(true);
    await rejectFriendRequest(requestId);
    setLoading(false);
    onAction();
  }

  return (
    <div>
      <Button color="primary" disabled={loading} onClick={handleAccept}>
        Accept
      </Button>
      <Button color="secondary" disabled={loading} onClick={handleReject}>
        Reject
      </Button>
    </div>
  );
}

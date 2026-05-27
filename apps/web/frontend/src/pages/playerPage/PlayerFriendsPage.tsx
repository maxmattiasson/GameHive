import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePendingRequests, useFriends } from "../../hooks/useFriends";
import { FriendRequestActions } from "../../components/ui/FriendRequestActions";

export function PlayerFriendsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const isOwnProfile = !id;

  const {
    data: pendingRequests,
    loading: pendingLoading,
    refetch: pendingRefetch,
  } = usePendingRequests();
  const {
    data: friends,
    loading: friendsLoading,
    refetch: friendsRefetch,
  } = useFriends();

  if (pendingLoading || friendsLoading) return <p>Loading...</p>;

  return (
    <section>
      {isOwnProfile && (
        <>
          <h2>Friend Requests</h2>
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <ul>
              {pendingRequests.map((request) => (
                <li key={request._id}>
                  <span>{request.requester.username}</span>
                  <FriendRequestActions
                    requestId={request._id}
                    onAction={() => {
                      pendingRefetch();
                      friendsRefetch();
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <h2>Friends</h2>
      {friends.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <ul>
          {friends.map((friendship) => {
            const friend =
              friendship.requester._id === user?._id
                ? friendship.recipient
                : friendship.requester;

            return (
              <li key={friendship._id}>
                <span>{friend.username}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

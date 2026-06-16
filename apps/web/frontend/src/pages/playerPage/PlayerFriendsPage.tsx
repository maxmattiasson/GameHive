import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { slugify } from "../../helpers/slugify";
import { useAuth } from "../../hooks/useAuth";
import {
  usePendingRequests,
  useFriends,
  useFriendsByUserId,
} from "../../hooks/useFriends";
import { FriendRequestActions } from "../../components/ui/FriendRequestActions";
import styles from "./PlayerFriendsPage.module.css";
import UserSearchField from "../../components/ui/UsersSearchField";
import { removeFriend } from "../../services/friendshipService";
import Button from "../../components/ui/Button";

export function PlayerFriendsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const isOwnProfile = !id;

  const {
    data: pendingRequests,
    loading: pendingLoading,
    refetch: pendingRefetch,
  } = usePendingRequests();

  const ownFriends = useFriends();
  const otherFriends = useFriendsByUserId(id ?? "");
  const friends = id ? otherFriends.data : ownFriends.data;
  const friendsLoading = id ? otherFriends.loading : ownFriends.loading;
  const friendsRefetch = ownFriends.refetch;
  const profileUserId = id ? id.match(/[0-9a-f]{24}$/i)?.[0] : user?._id;

  if (pendingLoading || friendsLoading)
    return <p className={styles.empty}>Loading...</p>;

  async function handleRemoveFriend(friendshipId: string) {
    try {
      await removeFriend(friendshipId);
      friendsRefetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className={styles.section}>
      {isOwnProfile && (
        <div>
          <h2 className={styles.heading}>Friend Requests</h2>
          {pendingRequests.length === 0 ? (
            <p className={styles.empty}>No pending requests</p>
          ) : (
            <ul className={styles.list}>
              {pendingRequests.map((request) => (
                <li key={request._id} className={styles.requestCard}>
                  <div className={styles.avatar}>
                    {request.requester.username[0]}
                  </div>
                  <span className={styles.username}>
                    <Link
                      to={`/users/${slugify(request.requester.username)}-${request.requester._id}`}
                    >
                      {request.requester.username}
                    </Link>
                  </span>
                  <div className={styles.requestActions}>
                    <FriendRequestActions
                      requestId={request._id}
                      onAction={() => {
                        pendingRefetch();
                        friendsRefetch();
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <h2 className={styles.heading}>Friends</h2>
        {friends.length === 0 ? (
          <p className={styles.empty}>No friends yet</p>
        ) : (
          <ul className={styles.list}>
            {friends.map((friendship) => {
              const friend =
                friendship.requester._id === profileUserId
                  ? friendship.recipient
                  : friendship.requester;

              return (
                <li key={friendship._id} className={styles.card}>
                  <div className={styles.avatar}>{friend.username[0]}</div>
                  <span className={styles.username}>
                    <Link
                      to={`/users/${slugify(friend.username)}-${friend._id}`}
                    >
                      {friend.username}
                    </Link>
                  </span>
                  {isOwnProfile && (
                    <Button
                      color="vote"
                      onClick={() => handleRemoveFriend(friendship._id)}
                    >
                      Remove
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div>
        <h2 className={styles.heading}>Find More Friends</h2>
        <UserSearchField />
      </div>
    </section>
  );
}

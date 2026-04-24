import type { Types } from "mongoose";

export type FriendshipStatus = "pending" | "accepted";

export interface Friendship {
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status: FriendshipStatus;
}

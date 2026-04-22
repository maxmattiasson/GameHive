import mongoose from "mongoose";
import { Friendship } from "../types/friendshipTypes.js";

const FriendshipSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  {
    collection: "friendships",
    timestamps: true,
  },
);

FriendshipSchema.index({ requester: 1, recipient: 1 }, { unique: true });

const FriendshipModel = mongoose.model<Friendship>(
  "Friendship",
  FriendshipSchema,
);

export default FriendshipModel;

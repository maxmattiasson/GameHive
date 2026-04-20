import mongoose from "mongoose";
import { userInfo } from "node:os";

const LibrarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["owned", "wishlist"],
      default: "owned",
      required: true
    },
    playtimeMinutes: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    lastPlayedAt: {
      type: Number,
      default: null
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  { collection: "library", timestamps: true }
);

LibrarySchema.index({ userId: 1, gameId: 1 }, { unique: true });

const LibraryModel = mongoose.model("library", LibrarySchema);

export default LibraryModel;

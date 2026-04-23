import mongoose, { InferSchemaType, model } from "mongoose";

const LibrarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true
    },
    playtimeMinutes: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    }
  },
  // timestamp to get entry createdAt and updatedAt, for future filtering and tracking
  { collection: "library", timestamps: true }
);

// there can only be one of the same game in library
LibrarySchema.index({ userId: 1, gameId: 1 }, { unique: true });

export type LibraryDocument = InferSchemaType<typeof LibrarySchema>;

const LibraryModel = model<LibraryDocument>("Library", LibrarySchema);

export default LibraryModel;

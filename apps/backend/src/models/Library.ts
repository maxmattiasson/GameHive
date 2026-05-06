import mongoose, { InferSchemaType, model } from "mongoose";

// MongoDB model / schema
// Defines how game data is stored
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

  { collection: "library" }
);

// there can only be one of the same gameId in library
LibrarySchema.index({ userId: 1, gameId: 1 }, { unique: true });

export type LibraryDocument = InferSchemaType<typeof LibrarySchema>;

// mongoose-model named Library with librarySchema
const LibraryModel = model<LibraryDocument>("Library", LibrarySchema);

export default LibraryModel;

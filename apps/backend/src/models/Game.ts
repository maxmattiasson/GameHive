import mongoose from "mongoose";
// MongoDB model / schema
// Defines how game data is stored

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    release: {
      type: Date,
      required: true,
    },
    dev: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    thumb: {
      type: String,
    },
    multiplayer: {
      type: Boolean,
      required: true,
    },
    avg_rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    review: {
      type: [mongoose.Schema.Types.Mixed], // change later when review type exists
    },
  },
  { collection: "games" },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;

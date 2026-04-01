import mongoose from "mongoose";
// MongoDB model / schema
// Defines how game data is stored

const gameSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    created: {
      type: String,
    },
    dev: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    multiplayer: {
        type: Boolean,
    },
  },
  { collection: "Game" }
);
  
  const Game = mongoose.model("Game", gameSchema);

  export default Game;
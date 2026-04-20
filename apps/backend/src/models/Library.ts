import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  playtimeMinutes: {
    type: Number,
    required: true
  },
  lastPlayedAt: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Number,
    required: true
  }
});

import mongoose, { Schema, Document, Types } from "mongoose";

interface ReviewVote {
  user: Types.ObjectId;
  value: 1 | -1;
}

export interface ReviewDocument extends Document {
  game: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  rating?: number;
  votes: ReviewVote[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        value: {
          type: Number,
          enum: [1, -1],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

reviewSchema.index({ game: 1, user: 1 }, { unique: true });

const Review = mongoose.model<ReviewDocument>("Review", reviewSchema);

export default Review;
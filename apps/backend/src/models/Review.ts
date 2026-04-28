import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,

    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    votes: [
        { 
            user: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User",
            }, 
            value: {
                type: Number,
                enum: [1, -1]
            },
        },
    ],
},
{timestamps: true}
);

reviewSchema.index({ user: 1, game: 1 }, { unique: true });
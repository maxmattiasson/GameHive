import mongoose, { Schema } from "mongoose";
import type { User } from "../types/userType.js";
import AchievementsModel from "./Achievements.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "dev"],
      default: "user"
    },
    loginCount: {
      type: Number,
      required: false,
      default: 0
    },
    userAchievements: [
      {
        type: Schema.Types.ObjectId,
        ref: AchievementsModel
      }
    ],
    avatar: {
      type: String,
      required: false,
      default: "avatar1"
    }
  },
  {
    collection: "users",
    timestamps: true
  }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;

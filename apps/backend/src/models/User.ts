import mongoose from "mongoose";
import type { User } from "../types/userTypes.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "dev"],
      default: "user",
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;

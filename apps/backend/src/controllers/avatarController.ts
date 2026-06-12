import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import type { z } from "zod";
import { avatarSchema } from "../schemas/avatar.schema.js";

const updateAvatar = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { avatar } = req.validatedBody as z.infer<typeof avatarSchema>;

    const allowedAvatars = [
      "avatar1",
      "avatar2",
      "avatar3",
      "avatar4",
      "avatar5"
    ];

    if (!allowedAvatars.includes(avatar)) {
      return res.status(400).json({ message: "Invalid avatar value" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.userId,
      { avatar },
      { new: true }
    ).select("username email role avatar createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Avatar updated", user });
  } catch (error) {
    next(error);
  }
};
export default updateAvatar;

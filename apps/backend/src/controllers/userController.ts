import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import FriendshipModel from "../models/Friendship.js";
import Review from "../models/Review.js";
import Game from "../models/Game.js";
import { NotFoundError } from "../errors/AppError.js";

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const id = req.params.id as string;
    const user = await UserModel.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    await Promise.all([
      LibraryModel.deleteMany({ userId: id }),
      FriendshipModel.deleteMany({
        $or: [{ requester: id }, { recipient: id }]
      }),
      Review.deleteMany({ user: id }),
      Review.updateMany({}, { $pull: { votes: { user: id } } }),
      Game.updateMany({ ownerUserId: id }, { $unset: { ownerUserId: "" } }),
      UserModel.findByIdAndDelete(id)
    ]);

    res.json({
      message: "User deleted and related data cleaned up",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

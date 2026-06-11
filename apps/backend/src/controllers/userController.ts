import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import FriendshipModel from "../models/Friendship.js";
import Review from "../models/Review.js";
import Game from "../models/Game.js";
import { ForbiddenError, NotFoundError } from "../errors/AppError.js";

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role === "user" || req.user?.role === "dev") {
      const users = await UserModel.find({ role: "user" }).select(
        "username createdAt"
      );
      res.json(users);
    }
    if (req.user?.role === "admin") {
      const users = await UserModel.find({
        role: { $in: ["dev", "user"] }
      }).select("username role createdAt");
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
}

export const searchUsersFreeText = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { query } = req.validatedQuery as { query: string };

    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    if (req.user?.role === "user" || req.user?.role === "dev") {
      const users = await UserModel.find({
        role: "user",
        $or: [
          { username: { $regex: escapedQuery, $options: "i" } },
          { email: { $regex: escapedQuery, $options: "i" } }
        ]
      }).select("username createdAt");
      res.json(users);
    }
    if (req.user?.role === "admin") {
      const users = await UserModel.find({
        role: { $in: ["dev", "user"] },
        $or: [
          { username: { $regex: escapedQuery, $options: "i" } },
          { email: { $regex: escapedQuery, $options: "i" } }
        ]
      }).select("username role createdAt");
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
}


export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    
    if (req.user?.role !== "admin" && req.user?.userId !== id) {
      throw new ForbiddenError("Not authorized to delete");
    }
    
    const deletee = await UserModel.findByIdAndDelete(id);
    if (!deletee) {
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
      user: { id: deletee._id, username: deletee.username, email: deletee.email }
    });
  } catch (error) {
    next(error);
  }
};

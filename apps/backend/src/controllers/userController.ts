import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import { NotFoundError } from "../errors/AppError.js";

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const user = await UserModel.findByIdAndDelete(id);

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    if (!user) {
      throw new NotFoundError();
    }

    res.json({
      message: "User deleted",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

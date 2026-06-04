import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import UserModel from "../models/User.js";
import { ForbiddenError, NotFoundError } from "../errors/AppError.js";

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    
    if (req.user?.role !== "admin" && req.user?.userId !== id) {
      // return res.status(403).json({ message: "Admin only" });
      throw new ForbiddenError("Not authorized to delete");
    }
    
    const deletee = await UserModel.findByIdAndDelete(id);
    if (!deletee) {
      throw new NotFoundError();
    }

    res.json({
      message: "User deleted",
      user: { id: deletee._id, username: deletee.username, email: deletee.email }
    });
  } catch (error) {
    next(error);
  }
};

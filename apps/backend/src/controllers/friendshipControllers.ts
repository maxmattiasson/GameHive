import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import FriendshipModel from "../models/Friendship.js";
import { ConflictError } from "../errors/AppError.js";

async function sendFriendRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const requester = req.user!.userId;
  const recipient = req.body.recipient;

  try {
    const friendship = await FriendshipModel.create({
      requester,
      recipient,
    });

    return res.status(201).json(friendship);
  } catch (err: any) {
    if (err.code === 11000) // duplicate key
    {
      return next(new ConflictError());
    }
    next(err);
  }
}

async function getPendingRequests(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.userId;

  try {
    const requests = await FriendshipModel.find({
      recipient: userId,
      status: "pending",
    }).populate("requester", "username");

    return res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
}

export { sendFriendRequest, getPendingRequests };

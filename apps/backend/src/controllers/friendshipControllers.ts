import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import FriendshipModel from "../models/Friendship.js";
import {
  friendshipBodySchema,
  friendshipParamsSchema,
} from "../schemas/friendship.schemas.js";
import { ConflictError, ValidationError } from "../errors/AppError.js";

async function sendFriendRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const requester = req.user!.userId;

  const result = friendshipBodySchema.safeParse(req.body);
  if (!result.success) {
    return next(new ValidationError());
  }
  const { recipient } = result.data;

  if (requester === recipient) {
    return next(new ValidationError("You can't add yourself as a friend"));
  }

  try {
    const friendship = await FriendshipModel.create({
      requester,
      recipient,
    });

    return res.status(201).json(friendship);
  } catch (err: any) {
    if (err.code === 11000) {
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

async function acceptFriendRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.userId;

  const result = friendshipParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ValidationError());
  }
  const { id } = result.data;

  try {
    const friendship = await FriendshipModel.findOneAndUpdate(
      { _id: id, recipient: userId, status: "pending" },
      { status: "accepted" },
      { new: true },
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    return res.status(200).json(friendship);
  } catch (err) {
    next(err);
  }
}

async function rejectFriendRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.userId;

  const result = friendshipParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ValidationError());
  }
  const { id } = result.data;

  try {
    const friendship = await FriendshipModel.findOneAndDelete({
      _id: id,
      recipient: userId,
      status: "pending",
    });

    if (!friendship) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    return res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    next(err);
  }
}

async function getFriends(req: AuthRequest, res: Response, next: NextFunction) {
  const userId = req.user!.userId;

  try {
    const friends = await FriendshipModel.find({
      status: "accepted",
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate("requester", "username")
      .populate("recipient", "username");

    return res.status(200).json(friends);
  } catch (err) {
    next(err);
  }
}

async function getFriendsByUserId(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const result = friendshipParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ValidationError());
  }
  const { id } = result.data;

  try {
    const friends = await FriendshipModel.find({
      $or: [{ requester: id }, { recipient: id }],
      status: "accepted",
    } as any)
      .populate("requester", "username")
      .populate("recipient", "username");

    return res.status(200).json(friends);
  } catch (err) {
    next(err);
  }
}

export {
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getFriendsByUserId,
};

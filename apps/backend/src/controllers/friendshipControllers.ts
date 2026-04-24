import { Response } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import FriendshipModel from "../models/Friendship.js";

async function sendFriendRequest(req: AuthRequest, res: Response) {
  const requester = req.user?.userId;

  if (!requester) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const recipient = req.body.recipient;

  if (!recipient || recipient === requester) {
    return res.status(400).json({ message: "invalid recipient" });
  }

  try {
    const friendship = await FriendshipModel.create({
      requester,
      recipient,
    });

    return res.status(201).json(friendship);
  } catch (err: any) {
    if (err.code === 11000) // duplicate key
    {
      return res.status(409).json({ message: "Friend request already exists" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export { sendFriendRequest };

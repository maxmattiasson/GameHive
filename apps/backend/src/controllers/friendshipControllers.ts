import { Response } from "express";
import { AuthRequest } from "../auth/authMiddleware.js";
import FriendshipModel from "../models/Friendship.js";

function sendFriendRequest(req: AuthRequest, res: Response) {
  const requester = req.user?.userId;

  if (!requester) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const recipient = req.body.recipient;

  if (!recipient || recipient === requester) {
    return res.status(400).json({ message: "invalid recipient" });
  }
}

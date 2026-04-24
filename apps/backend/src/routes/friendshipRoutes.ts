import { Router } from "express";
import {
  sendFriendRequest,
  getPendingRequests,
} from "../controllers/friendshipControllers.js";
import { authMiddleware } from "../auth/authMiddleware.js";

const router = Router();

router.post("/requests", authMiddleware, sendFriendRequest);
router.get("/requests", authMiddleware, getPendingRequests);

export default router;

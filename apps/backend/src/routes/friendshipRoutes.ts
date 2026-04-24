import { Router } from "express";
import { sendFriendRequest } from "../controllers/friendshipControllers.js";
import { authMiddleware } from "../auth/authMiddleware.js";

const router = Router();

router.post("/requests", authMiddleware, sendFriendRequest);

export default router;

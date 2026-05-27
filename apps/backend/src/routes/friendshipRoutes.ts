import { Router } from "express";
import {
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
} from "../controllers/friendshipControllers.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { friendshipBodySchema } from "../schemas/friendship.schemas.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.post(
  "/requests",
  authMiddleware,
  validateRequest({ body: friendshipBodySchema }),
  sendFriendRequest,
);
router.get("/requests", authMiddleware, getPendingRequests);

router.patch("/requests/:id/accept", authMiddleware, acceptFriendRequest);

router.delete("/requests/:id", authMiddleware, rejectFriendRequest);

router.get("/friends", authMiddleware, getFriends);

export default router;

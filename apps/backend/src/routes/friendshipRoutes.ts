import { Router } from "express";
import {
  sendFriendRequest,
  getPendingRequests,
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

export default router;

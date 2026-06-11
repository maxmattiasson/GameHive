import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { getUserReviews } from "../controllers/reviewController.js";
import { idParamSchema, searchQuerySchema } from "../schemas/common.schemas.js";
import { validateRequest } from "../middleware/validate.js";
import { NotFoundError } from "../errors/AppError.js";
import { Response, NextFunction } from "express";
import { deleteUser, getUsers, searchUsersFreeText } from "../controllers/userController.js";
import updateAvatar from "../controllers/avatarController.js";
import { avatarSchema } from "../schemas/avatar.schema.js";

const router = Router();

// Endpoint for listing all users
// Users with "user" role can see only other users, while "admin" can see both "dev" and "user"
router.get("/", authMiddleware, getUsers);

router.get("/search", authMiddleware, validateRequest({ query: searchQuerySchema }), searchUsersFreeText);

router.get("/:id", authMiddleware, validateRequest({ params: idParamSchema }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      const user = await UserModel.findById(id).select(
        "username role avatar userAchievements createdAt"
      );

      if (!user) {
        throw new NotFoundError();
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/library",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const library = await LibraryModel.find({ userId: id }).populate({
        path: "gameId",
        select: "title thumb dev genres release multiplayer",
        populate: { path: "genres", select: "name" }
      });

      res.json(library);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/achievements",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      const user = await UserModel.findById(id).populate("userAchievements");

      if (!user) {
        throw new NotFoundError();
      }

      res.json(user.userAchievements);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/reviews",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  getUserReviews
);

router.delete(
  "/:id",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  deleteUser
);

router.patch(
  "/me/avatar",
  authMiddleware,
  validateRequest({ body: avatarSchema }),
  updateAvatar
);

export default router;

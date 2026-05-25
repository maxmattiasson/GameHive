import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { getUserReviews } from "../controllers/reviewController.js";
import { idParamSchema } from "../schemas/common.schemas.js";
import { validateRequest } from "../middleware/validate.js";
import { NotFoundError } from "../errors/AppError.js";
import { Response, NextFunction } from "express";
import { deleteUser } from "../controllers/userController.js";

const router = Router();

router.get(
  "/:id",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      const user = await UserModel.findById(id).select(
        "username role userAchievements createdAt"
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

router.get("/:id/reviews", authMiddleware, getUserReviews);

router.delete(
  "/:id",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  deleteUser
);
export default router;

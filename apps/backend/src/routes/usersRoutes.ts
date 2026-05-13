import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { getUserReviews } from "../controllers/reviewController.js";
import { userIdParamSchema } from "../schemas/user.schemas.js";
import { validateRequest } from "../middleware/validate.js";
import { NotFoundError } from "../errors/AppError.js";
import { Response, NextFunction } from "express";

const router = Router();

router.get(
  "/:id",
  authMiddleware,
  validateRequest({ params: userIdParamSchema }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      const user = await UserModel.findById(id).select(
        "username role userAchievements createdAt",
      );

      if (!user) {
        throw new NotFoundError();
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);

router.get("/:id/library", authMiddleware, async (req: AuthRequest, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const library = await LibraryModel.find({ userId: id }).populate({
    path: "gameId",
    select: "title thumb dev genres release multiplayer",
    populate: { path: "genres", select: "name" },
  });

  res.json(library);
});

router.get(
  "/:id/achievements",
  authMiddleware,
  async (req: AuthRequest, res) => {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await UserModel.findById(id).populate("userAchievements");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.userAchievements);
  },
);

router.get("/:id/reviews", authMiddleware, getUserReviews);

export default router;

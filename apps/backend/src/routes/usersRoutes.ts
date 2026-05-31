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

router.get("/:id/reviews", authMiddleware, validateRequest({ params: idParamSchema }), getUserReviews);

router.delete(
  "/:id",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  deleteUser
);

// Endpoint for listing all users
// Users with "user" role can see only other users, while "admin" can see both "dev" and "user"
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role === "user" || req.user?.role === "dev") {
        const users = await UserModel.find({ role: "user" }).select(
          "username createdAt"
        );
        res.json(users);
      }
      if (req.user?.role === "admin") {
        const users = await UserModel.find({
          role: { $in: ["dev", "user"] }
        }).select("username role createdAt");
        res.json(users);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const query = req.query.search as string;

    const escpapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    if(req.user?.role === "user" || req.user?.role === "dev") {
      const users = await UserModel.find({ 
        role: "user", 
        $or: [
          { username: { $regex: escpapedQuery, $options: "i" } },
          { email: { $regex: escpapedQuery, $options: "i" } }
        ]
       }).select("username createdAt");
      res.json(users);
    }
    if(req.user?.role === "admin") {
      const users = await UserModel.find({ 
        role: { $in: ["dev", "user"] }, 
        $or: [
          { username: { $regex: escpapedQuery, $options: "i" } },
          { email: { $regex: escpapedQuery, $options: "i" } }
        ]
       }).select("username role createdAt");
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
});

export default router;

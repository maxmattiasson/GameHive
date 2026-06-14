import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { getUserReviews } from "../controllers/reviewController.js";
import { idParamSchema, searchQuerySchema } from "../schemas/common.schemas.js";
import { validateRequest } from "../middleware/validate.js";
import { NotFoundError } from "../errors/AppError.js";
import { Response, NextFunction } from "express";
import { deleteUser, getUserById, getUserLibrary, getUsers, searchUsersFreeText, getUserAchievements } from "../controllers/userController.js";
import updateAvatar from "../controllers/avatarController.js";
import { avatarSchema } from "../schemas/avatar.schema.js";

const router = Router();

router.get("/", authMiddleware, getUsers);

router.get("/search", authMiddleware, validateRequest({ query: searchQuerySchema }), searchUsersFreeText);

router.get("/:id", authMiddleware, validateRequest({ params: idParamSchema }), getUserById);

router.get("/:id/library", authMiddleware, validateRequest({ params: idParamSchema }), getUserLibrary);

router.get("/:id/achievements", authMiddleware, validateRequest({ params: idParamSchema }), getUserAchievements);

router.get("/:id/reviews", authMiddleware, validateRequest({ params: idParamSchema }), getUserReviews);

router.delete("/:id", authMiddleware, validateRequest({ params: idParamSchema }), deleteUser);

router.patch("/me/avatar", authMiddleware, validateRequest({ body: avatarSchema }), updateAvatar);

export default router;

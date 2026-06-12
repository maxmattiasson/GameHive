import { Express, Router } from "express";
import { getAllAchievements } from "../controllers/achievementsController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";

const router = Router()

router.get('/', getAllAchievements)

export default router;
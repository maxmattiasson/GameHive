import { Express, Router } from "express";
import { addAchievement, getAllAchievements } from "../controllers/achievementsController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";

const router = Router()

router.get('/', getAllAchievements)
router.post('/', authMiddleware, requireRole("admin"), addAchievement)

export default router;
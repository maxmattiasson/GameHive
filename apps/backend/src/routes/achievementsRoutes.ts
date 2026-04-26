import { Express, Router } from "express";
import { addAchievement, getAllAchievements } from "../controllers/achievementsController.js";

const router = Router()

router.get('/', getAllAchievements)
router.post('/', addAchievement)

export default router
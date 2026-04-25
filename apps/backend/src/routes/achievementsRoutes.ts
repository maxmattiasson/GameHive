import { Express, Router } from "express";
import { getAllAchievements } from "../controllers/achievementsController.js";

const router = Router()

router.get('/', getAllAchievements)
// TODO: Add new achievement
router.post('/', addAchievement)

export default router
import { Request, Response, NextFunction } from "express";
import Achievements from "../models/Achievements.js";

// List all achievements
export const getAllAchievements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const achievementsList = await Achievements.find() 
        res.json(achievementsList)
    } catch(error) {
        next(error)
    }
}

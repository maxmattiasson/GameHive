import { Request, Response, NextFunction } from "express";
import Achievements from "../models/Achievements.js";

// List all achievements
export const getAllAchievements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const achievementsList = Achievements.find() 
        if(!achievementsList) {
            res.status(404).json({error: "Achieved nothing, will never..."})
        }
        res.json(achievementsList)
    } catch(error) {
        next(error)
    }
}
// Add new achievement
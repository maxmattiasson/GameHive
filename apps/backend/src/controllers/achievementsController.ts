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
// Add new achievement
export const addAchievement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, criteria, category } = req.body
        const newAchievement = new Achievements({ title, description, criteria, category })
        await newAchievement.save()
        res.status(201).json(newAchievement)
    } catch(error) {
        next(error)
    }
}
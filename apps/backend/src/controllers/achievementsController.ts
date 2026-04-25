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
export const addAchievement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, gameId } = req.body
        const newAchievement = new Achievements({ name, description, gameId })
        await newAchievement.save()
        res.status(201).json(newAchievement)
    } catch(error) {
        next(error)
    }
}
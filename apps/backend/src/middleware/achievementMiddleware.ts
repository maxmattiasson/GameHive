import { Request, Response, NextFunction } from "express"

// import { Achievements } from "../models/Achievements.js";

// interface Achievement {
//     title: string,
//     description: string,
//     criteria: number,
// }


export const checkLoginCount = (req: Request, res: Response, next: NextFunction) => {
    
    next()
}

// const checkForAchievement = (metric: string, userValue: number): Achievement | null => {
//     // Find the Achievevement with the matching criteria if there is one.
//     const metricArray = Achievements[metric as keyof typeof Achievements]
//     const unlocked: Achievement | null = metricArray.filter(ach => userValue >= ach.criteria).pop() || null
 
//     // Compare metric with criteria
//     // If fulfilled, return achievement
//     return unlocked
// }



    // user.loginCount = (user.loginCount || 0) + 1
    // const achievementUnlocked = checkForAchievement("loginCount", user.loginCount)

import { Request, Response, NextFunction } from "express"
import Achievements from "../models/Achievements.js"
import UserModel from "../models/User.js"

// import { Achievements } from "../models/Achievements.js";

// interface Achievement {
//     title: string,
//     description: string,
//     criteria: number,
// }


export const checkLoginCount = async (req: Request, res: Response, next: NextFunction) => {
    // refactor required user data from req.body.user
    let { loginCount, achievements } = req.body.user
    loginCount = (loginCount || 0) + 1
    // Fetch the achievements meeting criteria for category "loginCount" from the database
    const achievementsMeetingCriteria = await Achievements.find({ category: "loginCount", criteria: { $lte: loginCount } })
    // Check if the user has already unlocked any of the achievements
    const unlockedAchievements = achievementsMeetingCriteria.filter(ach => !achievements.includes(ach._id.toString()))
    // If there are new achievements to unlock, add them to the user's achievements, save the users new login count and achievements
    const dbUser = await UserModel.findById(req.body.user._id)
    if (dbUser) {
        dbUser.loginCount = loginCount
        if (unlockedAchievements.length > 0) {
            dbUser.userAchievements = [...dbUser.userAchievements, ...unlockedAchievements.map(ach => ach._id.toString())]
        }
        await dbUser.save()
    }
    // Add the new achievements to the req.body.user object for use in the response
    req.body.user.loginCount = loginCount
    req.body.user.achievements = [...(achievements || []), ...unlockedAchievements.map(ach => ach._id.toString())]
    req.body.user.newUnlocks = unlockedAchievements.map(ach => ach._id.toString())
    
    next()
}


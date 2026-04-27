import { Request, Response, NextFunction } from "express"
import Achievements from "../models/Achievements.js"
import UserModel from "../models/User.js"

export const checkLoginCount = async (req: Request, res: Response, next: NextFunction) => {
    let { loginCount, userAchievements } = req.body.user
    loginCount = (loginCount || 0) + 1

    // Uppfyller användaren kriterierna för några nya achievements?
    const achievementsMeetingCriteria = await Achievements.find({ category: "loginCount", criteria: { $lte: loginCount } })
    const unlockedAchievements = achievementsMeetingCriteria.filter(ach => !userAchievements.includes(ach._id.toString()))

    // Spara uppdaterad loginCount och eventuella nya achievements i databasen
    const dbUser = await UserModel.findById(req.body.user._id)
    if (dbUser) {
        dbUser.loginCount = loginCount
        if (unlockedAchievements.length > 0) {
            dbUser.userAchievements = [...dbUser.userAchievements, ...unlockedAchievements.map(ach => ach._id.toString())]
        }
        await dbUser.save()
    }

    // Lägg uppdaterad loginCount och nya achievements i req.body för att sen skickas med i res
    req.body.user.loginCount = loginCount
    req.body.user.userAchievements = [...(userAchievements || []), ...unlockedAchievements.map(ach => ach._id.toString())]
    // För att frontend ska kunna visa vilka nya achievements som låstes upp vid inloggningen
    req.body.user.newUnlocks = unlockedAchievements.map(ach => ach._id.toString()) 

    next()
}


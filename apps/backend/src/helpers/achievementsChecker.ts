import Achievements from "../models/Achievements.js"
import User from "../models/User.js"
import Library from "../models/Library.js"
import { ObjectId } from "mongodb"

export const checkPlayerLibraryAchievements = async (userId: string): Promise<string[] | null> => {
    const user = await User.findById(userId)
    if (!user) return null

    const playerLibrary = await Library.find({ userId: user._id })
    const gameCount = playerLibrary.length
    const achievementsMeetingCriteria = (await Achievements.find({ category: "playerLibrary", criteria: { $lte: gameCount } })).map(ach => ach._id.toString())
    const unlockedAchievements = achievementsMeetingCriteria.filter(ach => !user.userAchievements.includes(ach))



    if (unlockedAchievements.length > 0) {
        user.userAchievements = [...user.userAchievements, ...unlockedAchievements.map(ach => ach)]
        await user.save()
        return unlockedAchievements
    }

    return null
}
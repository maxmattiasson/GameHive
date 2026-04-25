import mongoose from "mongoose"

export const AchievementsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 50,
    },
    criteria: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
})


const AchievementsModel = mongoose.model("Achievement", AchievementsSchema)

export default AchievementsModel
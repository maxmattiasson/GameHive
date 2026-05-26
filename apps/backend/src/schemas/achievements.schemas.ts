import { z } from "zod"

export const addAchievementSchema = z.object({
    title: z.string("An achievement is nothing without a proper title!").min(1, "Title must be at least 1 character long").max(30, "Title can't be over 30 characters"),
    description: z.string().max(50, "Description can't be over 50 characters").optional(),
    criteria: z.number("An achievement is nothing without a quantifiable goal!").int("An achievement criteria can't be a decimal number, you can't 'half-do' it, mister!").positive("Criteria must be a positive number, achievements are always positive, you know!"),
    category: z.string("An achievement must belong to a category, you can't just make stuff up millie-nillie like that!").min(1, "Not even ONE character?? Come on, dude!").max(30, "A category that long is probably too convoluted, bring it back to 30 characters tops, will ya'!")
})

export const updateAchievementSchema = z.object({
    title: z.string("An achievement is nothing without a proper title!").min(1, "Title must be at least 1 character long").max(30, "Title can't be over 30 characters").optional(),
    description: z.string().max(50, "Description can't be over 50 characters").optional(),
    criteria: z.number("An achievement is nothing without a quantifyable goal!").int("An achievement criteria can't be a decimal number, you can't 'half-do' it, mister!").positive("Criteria must be a positive number, achievements are always positive, you know!").optional(),
    category: z.string("An achievement must belong to a category, you can't just make stuff up millie-nillie like that!").min(1, "Not even ONE character?? Come on, dude!").max(30, "A category that long is probably too convoluted, bring it back to 30 characters tops, will ya'!").optional(),
})
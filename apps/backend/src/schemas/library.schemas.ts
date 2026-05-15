import { z } from "zod";

export const idParamSchema = z.object({
    gameId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID-format"), // check if ID is 24 HEX
})

export const addToLibrarySchema = z.object({
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
})

export const updateLibraryEntrySchema = z.object({
  playtimeMinutes: z.number("playtimeMinutes must be a number").nonnegative("playtimeMinutes must be non-negative").optional()
})


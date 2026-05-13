import { z } from "zod";

export const idParamSchema = z.object({
    gameId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID-format"), // check if ID is 24 HEX
})

export const addRemoveLibrarySchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
})

export const updateLibraryEntrySchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  playtimeMinutes: z.number("playtimeMinutes must be a number").nonnegative("playtimeMinutes must be non-negative").optional()
})


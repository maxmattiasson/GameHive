import { z } from "zod";

export const addRemoveLibrarySchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
})

export const updateLibraryEntrySchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  playtimeMinutes: z.number("playtimeMinutes must be a number").nonnegative("playtimeMinutes must be non-negative")
})


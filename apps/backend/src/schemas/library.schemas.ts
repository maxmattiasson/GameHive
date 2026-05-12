import { z } from "zod";

export const addToLibrarySchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
})


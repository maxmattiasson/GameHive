import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

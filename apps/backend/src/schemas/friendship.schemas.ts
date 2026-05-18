import { z } from "zod";

export const friendshipBodySchema = z.object({
  recipient: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

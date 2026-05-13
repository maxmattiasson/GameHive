import { z } from "zod";

export const userIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

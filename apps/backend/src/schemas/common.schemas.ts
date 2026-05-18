import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const gameIdParamsSchema = z.object({
  gameId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

import { z } from "zod";

export const avatarSchema = z.object({
  avatar: z.string().trim().min(1, "avatar is required")
});

import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().trim().min(2).max(20),
  email: z.email().trim(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(1),
});
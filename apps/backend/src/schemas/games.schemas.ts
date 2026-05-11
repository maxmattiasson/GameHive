import { z } from "zod";

export const createGameSchema = z.object({
  title: z.string().min(0).max(100).trim(),
  release: z.coerce.date(),
  genres: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)),
  platforms: z.array(
    z.enum([
      "Multi",
      "Wii",
      "PS4",
      "Xbox One",
      "PC",
      "Switch",
      "Console",
      "PS5",
      "Xbox Series X/S",
      "Xbox",
      "Wii U",
    ]),
  ),
  desc: z.string().min(20).max(500).trim().optional(),
  thumb: z.string(),
  multiplayer: z.boolean(),
});

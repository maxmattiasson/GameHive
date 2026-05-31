import z from "zod"

export const createReviewSchema = z
  .object({
    text: z.string().trim().max(1000).optional(),
    rating: z.number().min(1).max(5).optional(),
  })
  .refine((data) => data.text || data.rating !== undefined, {
    message: "Review text or rating required",
  });
  
  export const updateReviewSchema = z
  .object({
    text: z.string().trim().max(1000).optional(),
    rating: z.number().min(1).max(5).optional(),
  })
  .refine((data) => data.text || data.rating !== undefined, {
    message: "Review text or rating required",
  });

export const voteReviewSchema = z.object({
  value: z.union([z.literal(1), z.literal(-1)]),
});
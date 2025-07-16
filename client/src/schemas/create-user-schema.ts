import { z } from "zod/v4";

export const CreateUserSchema = z.object({
  fullname: z
    .string({ error: "Invalid format for full name" })
    .trim()
    .nonempty({ error: "Please enter your full name" })
    .min(3, { error: "Full name must be at least 3 characters long" })
    .max(50, { error: "Full name cannot exceed 50 characters" }),
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;

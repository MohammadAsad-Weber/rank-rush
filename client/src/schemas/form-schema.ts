import { z } from "zod/v4";

export const FormSchema = z.object({
  userId: z
    .string({ error: "Invalid format for user" })
    .nonempty({ error: "Please select a user to claim points" }),
});
export type FormType = z.infer<typeof FormSchema>;

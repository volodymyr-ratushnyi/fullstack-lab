import { z } from "zod"

export const signInSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string()
    .min(5, { error: "Password must be more than 8 characters" })
    .max(32, { error: "Password must be less than 32 characters" }),
});

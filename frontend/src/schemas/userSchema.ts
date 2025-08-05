import z from "zod";

export const userSchema = z.object({
    userEmail: z.string().optional(),
    userPhoneNumber: z.string(),
    userPassword: z.string(),
    userName: z.string(),
    userImage: z.string().optional()
})
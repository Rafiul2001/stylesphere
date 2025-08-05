import z from "zod";

export const userSchema = z.object({
    accessToken: z.string(),
    user: z.object({
        userEmail: z.string().optional(),
        userPhoneNumber: z.string(),
        userName: z.string(),
        userImage: z.string().optional()
    })
})

export type TUserSchema = z.infer<typeof userSchema>
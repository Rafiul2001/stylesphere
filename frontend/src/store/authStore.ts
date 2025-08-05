import { create } from "zustand";
import type { TUserSchema, userSchema } from "../validators/userSchema";
import type z from "zod";

type TAuth = {
    isAuthenticated: boolean
    accessToken: z.infer<typeof userSchema>["accessToken"] | null
    user: z.infer<typeof userSchema>["user"] | undefined
}

type TAuthAction = {
    login: (loginData: TUserSchema) => void
    logout: () => void
}

export const authStore = create<TAuth & TAuthAction>((set, get) => ({
    isAuthenticated: false,
    accessToken: null,
    user: undefined,

    login: (loginData) => set({
        accessToken: loginData.accessToken,
        user: loginData.user,
        isAuthenticated: true
    }),

    logout: () => set({
        accessToken: null,
        user: undefined,
        isAuthenticated: false
    })
}))
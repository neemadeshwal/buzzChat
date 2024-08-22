import { z } from "zod";

export const userSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    imgUrl: z.string().optional()
})

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})


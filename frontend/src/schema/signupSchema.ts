import { z } from 'zod';
export const signUpSchema = z.object({
    name: z.string().min(6),
    email: z
        .string()
        .email("Please enter a valid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty("Password is required"),
});
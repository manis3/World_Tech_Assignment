import { z } from 'zod';
export const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
});

export const otpSchema = z.object({
    otp: z.string().min(4, "OTP must be 4 digits"),
});

export const newPasswordSchema = z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

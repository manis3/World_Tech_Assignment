export type ResetPasswordSteps = "LOADING" | "EMAIL" | "OTP" | "RESET_PASSWORD"


export interface IResetPasswordPayload {
    email?: string;
    otp?: string;
    newPassword: string;
}
import { ResetPasswordSteps } from '@/types/resetPasswordSteps';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useHandleModalAction } from './useHandleModalAction';
import Input from '@/components/ui/input/default';
import Button from '@/components/ui/Button/ButtonWithLoadingState';
import { emailSchema, newPasswordSchema, otpSchema } from '@/schema/resetpasswordSchema';
import useRequestOtp from '@/query/RessetPassword/useRequestOtp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/otp/otp';
import useResetPassword from '@/query/RessetPassword/useResetPassword';


const resetPasswordSchema = emailSchema.merge(otpSchema).merge(newPasswordSchema);

type FormData = z.infer<typeof resetPasswordSchema>;

function StepAnimation({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
}

export function useResetPasswordSteps() {
    const { sendOtp, isSendingOtp } = useRequestOtp();
    const { resetUserPassword, isPasswordResetting } = useResetPassword();
    const [step, setStep] = useState<ResetPasswordSteps>("EMAIL");
    const { openModal, closeModal, showModal } = useHandleModalAction();

    const [finalData, setFinalData] = useState<Partial<FormData>>({});

    const methods = useForm<FormData>({
        resolver: zodResolver(
            step === "EMAIL" ? emailSchema :
                step === "OTP" ? otpSchema :
                    newPasswordSchema
        ),
        defaultValues: { email: "", otp: "", newPassword: "" }
    });

    /**
     * after submitting the email an api gets call for otp request
     */

    const onSubmit = methods.handleSubmit(async (data) => {
        if (step === "EMAIL") {
            setFinalData(prev => ({ ...prev, email: data.email }));
            await sendOtp(data.email);
            setStep("OTP");
        } else if (step === "OTP") {
            setFinalData(prev => ({ ...prev, otp: data.otp }));
            setStep("RESET_PASSWORD");
        } else if (step === "RESET_PASSWORD") {
            const completeData = { ...finalData, newPassword: data.newPassword };
            await resetUserPassword(completeData)
            closeModal();
        }
    });

    const stepsMap: Record<ResetPasswordSteps, ReactNode> = {

        LOADING: (
            <div className="w-full h-[500px] flex items-center justify-center">
                <Loader />
            </div>
        ),
        EMAIL: (
            <StepAnimation key="email">
                <div className="flex items-center justify-center gap-10">
                    <h1 className="text-right font-medium">Email</h1>
                    <Controller
                        name="email"
                        control={methods.control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                variant="secondary"
                                className="w-auto flex-1 p-2"
                                {...field}
                                error={!!methods.formState.errors?.email}
                            />
                        )}
                    />
                    {methods.formState.errors?.email && (
                        <p className="text-red-500">{methods.formState.errors.email.message}</p>
                    )}
                    <Button onClick={onSubmit} type="button" loading={isSendingOtp}>Next</Button>
                </div>
            </StepAnimation>
        ),
        OTP: (
            <StepAnimation key="otp">
                <div className="flex items-center justify-between gap-10">
                    <h1 className="text-right font-medium">OTP</h1>
                    <Controller
                        name={'otp'}
                        control={methods.control}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputOTP
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                maxLength={6}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />

                                </InputOTPGroup>
                            </InputOTP>
                        )}
                    />
                    <Button onClick={onSubmit} type="button" >
                        Next
                    </Button>
                </div>
            </StepAnimation>
        ),
        RESET_PASSWORD: (
            <StepAnimation key="newPassword">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-right font-medium">Password</h1>
                    <Controller
                        name="newPassword"
                        control={methods.control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                variant="secondary"
                                className="w-auto flex-1 p-2"
                                {...field}
                                error={!!methods.formState.errors?.newPassword}
                            />
                        )}
                    />
                    {methods.formState.errors?.newPassword && (
                        <p className="text-red-500">{methods.formState.errors.newPassword.message}</p>
                    )}
                    <Button onClick={onSubmit} type="button" loading={isPasswordResetting}>Resest Password</Button>

                </div>
            </StepAnimation>
        ),
    };

    return {
        component: stepsMap[step],
        showResetPasswordModal: showModal,
        handleOpenResetPasswordModal: openModal,
        handleCloseResetPasswordModal: closeModal,
        setStep,
    };
}

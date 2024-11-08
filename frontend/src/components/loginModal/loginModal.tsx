import React, { useState } from 'react';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/input/default';
import { z } from 'zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/loginSchema';
import { LoginRequest } from '@/types/loginType';
import Button from '../ui/Button/ButtonWithLoadingState';
import { cn } from '@/utils/cn';
import { useResetPasswordSteps } from '@/hooks/useResetPasswordSteps';

export default function LoginModal({
    show,
    closeModal,
    title,
    showCloseIcon = true,
    className,
    handleloginUser,
    isLoggingIn
}: {
    show: boolean;
    closeModal: () => void;
    title: string;
    showCloseIcon?: boolean;
    className?: string;
    handleloginUser: (data: LoginRequest) => void;
    isLoggingIn: boolean;
}) {
    const [view, setView] = useState<'login' | 'forgotPassword'>('login');
    const { component, handleCloseResetPasswordModal, handleOpenResetPasswordModal, showResetPasswordModal } = useResetPasswordSteps();

    const methods = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'example@example.com',
            password: '',
        },
    });

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        handleloginUser(data);
        closeModal();
    };

    const handleForgetPassword = () => {
        closeModal();
        handleOpenResetPasswordModal();

    }

    return (
        <>
            <Modal show={show} closeModal={closeModal} title={title} showCloseIcon={showCloseIcon} className={cn("bg-background", className)}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* {view === 'login' ? (
                    <> */}
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
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <h1 className="text-right font-medium">Password</h1>
                        <Controller
                            name="password"
                            control={methods.control}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    variant="secondary"
                                    className="w-auto flex-1 p-2"
                                    {...field}
                                    error={!!methods.formState.errors?.password}
                                />
                            )}
                        />
                        {methods.formState.errors?.password && (
                            <p className="text-red-500">{methods.formState.errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="link"
                            className="text-text-ghostWhite"
                            onClick={handleForgetPassword}
                        >
                            Forgot Password?
                        </Button>
                        <Button variant="default" type="submit" className="ml-auto" loading={isLoggingIn}>
                            Login
                        </Button>
                    </div>
                    {/* </> */}

                </form >

            </Modal >

            <Modal show={showResetPasswordModal} closeModal={handleCloseResetPasswordModal} title={"Forget Password"} showCloseIcon={showCloseIcon} className={cn("bg-background", className)}>
                <FormProvider {...methods}>

                    {component}
                </FormProvider>
            </Modal>
        </>
    );
}

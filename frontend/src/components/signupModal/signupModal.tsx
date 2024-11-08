import React from 'react';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/input/default';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button/ButtonWithLoadingState';
import { cn } from '@/utils/cn';
import { signUpSchema } from '@/schema/signupSchema';
import { SignupRequest } from '@/types/ssignUpTypes';

export default function SignupModal({
  show,
  closeModal,
  title,
  showCloseIcon = true,
  className,
  handleSignupUser,
  isLoggingIn
}: {
  show: boolean;
  closeModal: () => void;
  title: string;
  showCloseIcon?: boolean;
  className?: string;
  handleSignupUser: (data: SignupRequest) => void;
  isLoggingIn: boolean;
}) {

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "Your name",
      email: 'example@example.com',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    handleSignupUser(data);
    closeModal();
  };
  return (
    <>
      <Modal show={show} closeModal={closeModal} title={title} showCloseIcon={showCloseIcon} className={cn("bg-background", className)}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-10">
            <h1 className="text-right font-medium">Name</h1>
            <Controller
              name="name"
              control={methods.control}
              render={({ field }) => (
                <Input
                  type="text"
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

            <Button variant="default" type="submit" className="ml-auto" loading={isLoggingIn}>
              Signup
            </Button>
          </div>
          {/* </> */}

        </form >

      </Modal >
    </>
  );
}

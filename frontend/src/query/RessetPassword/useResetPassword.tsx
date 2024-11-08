import useAxiosInstance from '@/services/useAxiosInstance'
import { IResetPasswordPayload } from '@/types/resetPasswordSteps';
import { useMutation } from '@tanstack/react-query';

export default function useResetPassword() {
    const { axiosInstance } = useAxiosInstance();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IResetPasswordPayload) => {
            return axiosInstance.post('auth/reset-password', payload)
        },
        onSuccess: () => {
            alert('Password changed successfully!')
        },
    });

    return {
        resetUserPassword: mutateAsync,
        isPasswordResetting: isPending
    }
}

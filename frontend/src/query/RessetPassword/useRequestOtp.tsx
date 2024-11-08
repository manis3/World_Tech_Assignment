import useAxiosInstance from '@/services/useAxiosInstance';
import { useMutation } from '@tanstack/react-query';

export default function useRequestOtp() {
    const { axiosInstance } = useAxiosInstance();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (email: string) => {
            return axiosInstance.post(`auth/request-otp`, { email });
        },
        onSuccess: () => {
            alert('OTP has been sent to your email!');
        }
    });

    return {
        sendOtp: mutateAsync,
        isSendingOtp: isPending
    };
}

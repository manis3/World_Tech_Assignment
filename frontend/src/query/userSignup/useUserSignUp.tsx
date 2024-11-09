import useAxiosInstance from '@/services/useAxiosInstance'
import { SignupRequest } from '@/types/ssignUpTypes';
import { useMutation } from '@tanstack/react-query';

export default function useUserSignUp() {
    const { axiosInstance } = useAxiosInstance();

    const { mutateAsync, isPending } = useMutation<
        unknown,
        unknown,
        SignupRequest,
        unknown
    >({
        mutationFn: (payload: SignupRequest) => {
            return axiosInstance.post('auth/signup', payload)
        },
        onSuccess: () => {
            alert('Signup successful');
        },
    });
    return {
        createUser: mutateAsync,
        isUserBeingCreated: isPending,

    }

}

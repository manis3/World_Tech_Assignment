import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@/services/useAxiosInstance";
import { LoginRequest, LoginResponse } from "@/types/loginType";

export default function useLoginUser() {
    const { axiosInstance } = useAxiosInstance();

    const { mutateAsync, isPending } = useMutation<
        LoginResponse,
        unknown,
        LoginRequest,
        unknown
    >({
        mutationFn: (payload: LoginRequest) => {
            return axiosInstance.post(`auth/login`, payload)
        },
        onSuccess: (data) => {
            //@ts-expect-error: should accesss token as data.data
            localStorage.setItem('token', data?.data?.token);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },

    });

    return {
        loginUser: mutateAsync,
        isLoggingIn: isPending,
    };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@/services/useAxiosInstance";
import { LoginRequest, LoginResponse } from "@/types/loginType";
import { USE_FETCH_BLOG_BY_ID } from "../BlogQuery/useFetchBlogById";
import { getErrorMessage } from "@/utils/error";

export interface ICommentProps {
    postId: number,
    content: string
}

export default function usePostComment() {
    const queryClient = useQueryClient();
    const { axiosInstance } = useAxiosInstance();

    const { mutateAsync, isPending } = useMutation<
        unknown,
        unknown,
        ICommentProps,
        unknown
    >({
        mutationFn: (payload: ICommentProps) => {
            return axiosInstance.post(`comment/create`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USE_FETCH_BLOG_BY_ID] })
            alert("Comment Posted Successfully")
        },
        onError: (error) => {
            //@ts-expect-error
            console.log(error?.status)
            //@ts-expect-error
            alert(getErrorMessage(error?.status))
        },

    });

    return {
        postComment: mutateAsync,
        isCommentBeingPosted: isPending,
    };
}

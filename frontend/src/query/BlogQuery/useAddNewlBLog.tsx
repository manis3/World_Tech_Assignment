import useAxiosInstance from '@/services/useAxiosInstance'
import { ICreateBlogProps } from '@/types/blogTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_FETCH_BLOGS } from './useFetchBlogs';

export default function useAddNewlBLog() {
    const { axiosInstance } = useAxiosInstance();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<unknown,
        unknown,
        ICreateBlogProps,
        unknown
    >({
        mutationFn: (payload: ICreateBlogProps) => {
            return axiosInstance.post('blog/create-post', payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USE_FETCH_BLOGS] })
            alert('Blog created successfully');
        },
        onError: (error) => {
            //@ts-expect-error
            console.log(error?.status)
            //@ts-expect-error
            alert(getErrorMessage(error?.status))
        }
    });
    return {
        createNewBlog: mutateAsync,
        isNewBlogBeingCreated: isPending
    }
}

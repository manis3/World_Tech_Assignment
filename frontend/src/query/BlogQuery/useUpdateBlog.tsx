import useAxiosInstance from '@/services/useAxiosInstance'
import { ICreateBlogProps } from '@/types/blogTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_FETCH_BLOGS } from './useFetchBlogs';

export default function useUpdateBlog() {
    const { axiosInstance } = useAxiosInstance();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<unknown,
        unknown,
        { payload: ICreateBlogProps, id?: number },
        unknown
    >({
        mutationFn: ({ payload, id }) => {
            return axiosInstance.put(`blog/update-post?id=${id}`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USE_FETCH_BLOGS] })
            alert('Blog Updated successfully');
        },
        onError: (error) => {
            //@ts-expect-error
            console.log(error?.status)
            //@ts-expect-error
            alert(getErrorMessage(error?.status))
        },
    });
    return {
        updateBlog: mutateAsync,
        IsBlogBeingUpdated: isPending
    }
}

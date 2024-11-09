"use Client"
import useAxiosInstance from '@/services/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

export const USE_FETCH_BLOG_BY_ID = 'use_fetch_blog_by_id'

export default function useFetchBlogById(id?: number) {
    const { axiosInstance } = useAxiosInstance()
    console.log(id, 'id inside the api call')
    const { data, isLoading, isError } = useQuery({
        queryKey: [USE_FETCH_BLOG_BY_ID, id],
        queryFn: async () => {
            if (!id) {
                throw new Error('ID is required');
            }
            const res = await axiosInstance.get(`blog/${id}`);
            return res;
        },
        enabled: !!id,
    });

    return {
        blogData: data?.data?.data,
        isBlogBeingFetched: isLoading,
        isError,
    }
}

"use Client"
import useAxiosInstance from '@/services/useAxiosInstance'
import { useQuery } from '@tanstack/react-query';

export const USE_FETCH_BLOGS_BY_CATEGORY = 'use_fetch_post_by-category'

export default function useFetchPostByCategory(id?: number) {
    const { axiosInstance } = useAxiosInstance();

    const { data, isPending } = useQuery({
        queryKey: [USE_FETCH_BLOGS_BY_CATEGORY, id],
        queryFn: async () => {
            const res = await axiosInstance.get(`category/get-category-post?id=${id}`)
            return res;
        },
    });
    return {
        categoryPost: data?.data?.posts,
        isCategoryPostBeingFetched: isPending,
    }
}

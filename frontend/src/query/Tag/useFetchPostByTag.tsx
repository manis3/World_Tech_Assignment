"use Client"
import useAxiosInstance from '@/services/useAxiosInstance'
import { useQuery } from '@tanstack/react-query';

export const USE_FETCH_BLOGS_BY_Tag = 'use_fetch_post_by-tag'

export default function useFetchPostByTag(id?: number) {
    const { axiosInstance } = useAxiosInstance();

    const { data, isPending } = useQuery({
        queryKey: [USE_FETCH_BLOGS_BY_Tag, id],
        queryFn: async () => {
            const res = await axiosInstance.get(`tag/get-post?id=${id}`)
            return res;
        },
    });
    console.log(data, "tag post")
    return {
        tagPosts: data?.data?.data?.posts,
        isTagPostBeingFetched: isPending,
    }
}

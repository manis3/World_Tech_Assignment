"use Client"
import useAxiosInstance from '@/services/useAxiosInstance'
import { useQuery } from '@tanstack/react-query';

export const USE_FETCH_ALL_TAGS = 'use_fetch_all_tags'

export default function useFetchAllTags() {
    const { axiosInstance } = useAxiosInstance();

    const { data, isPending } = useQuery({
        queryKey: [USE_FETCH_ALL_TAGS],
        queryFn: async () => {
            const res = await axiosInstance.get('tag/get-all')
            return res;
        },
    });
    return {
        allTags: data?.data?.tags,
        isTagsBeingFetched: isPending,
    }
}

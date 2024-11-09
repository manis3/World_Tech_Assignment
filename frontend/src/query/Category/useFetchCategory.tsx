"use Client"
import useAxiosInstance from '@/services/useAxiosInstance'
import { useQuery } from '@tanstack/react-query';

export const USE_FETCH_CATEGORY = 'use_fetch_category'

export default function useFetchCategory() {
    const { axiosInstance } = useAxiosInstance();

    const { data, isPending } = useQuery({
        queryKey: [USE_FETCH_CATEGORY],
        queryFn: async () => {
            const res = await axiosInstance.get('category/get-all-category')
            return res;
        },
    });
    return {
        allCategory: data?.data?.categories,
        isCategoryBeingFetched: isPending,
    }
}

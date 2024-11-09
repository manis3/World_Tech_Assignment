"use client";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

export const USE_FETCH_BLOGS = 'use-fetch-blogs';

export const useFetchBlogs = () => {
    const { axiosInstance } = useAxiosInstance();
    const { data, isPending, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        {
            queryKey: [USE_FETCH_BLOGS],
            queryFn: async ({ pageParam }) => {
                const res = await axiosInstance.get(`blog/all?limit=20&_page=${pageParam}`);
                return res;
            },
            initialPageParam: 0,
            getNextPageParam: (_lastPage, allPages) => {
                if (allPages.length < 10) {
                    return allPages.length + 1;
                }
                else {
                    return undefined;
                }
            }
        });
    return {
        allBlogs: data,
        isBlogBeingfetched: isPending,
        isErrorFetchingBlogs: isError,
        fetchNextPage: fetchNextPage,
        isFetchingNextPage: isFetchingNextPage
    }
}

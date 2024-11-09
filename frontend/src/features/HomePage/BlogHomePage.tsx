"use client";
import React, { useEffect } from 'react';
import { useFetchBlogs } from '@/query/BlogQuery/useFetchBlogs';
import Blog from '@/components/BlogCard/blog';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/ui/Loader/Loader';

export default function BlogHomePage() {
    const { allBlogs, isBlogBeingfetched, isFetchingNextPage, fetchNextPage } = useFetchBlogs();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    console.log("allBlogs", allBlogs);

    if (isBlogBeingfetched) {
        return <Loader />
    }

    return (
        <div className="w-full p-4">
            {isBlogBeingfetched && !allBlogs ? (
                <Loader />
            ) : allBlogs && allBlogs.pages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {allBlogs.pages.map((page) =>
                        page?.data?.data?.posts.map(blog => (
                            <Blog
                                key={blog.id}
                                title={blog.title}
                                created_at={new Date(blog.created_at)}
                                author={blog?.author?.name}
                                category={blog.category}
                                tags={blog.tags}
                                content={blog.content}
                            />
                        ))
                    )}
                </div>
            ) : (
                <p>No blogs available.</p>
            )}
            <div ref={ref} className="mt-4 flex justify-center">
                {isFetchingNextPage && <Loader />}
            </div>
        </div>
    );
}

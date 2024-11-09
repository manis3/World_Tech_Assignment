"use client";
import React, { useEffect } from 'react';
import { useFetchBlogs } from '@/query/BlogQuery/useFetchBlogs';
import Blog from '@/components/BlogCard/blog';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/ui/Loader/Loader';
import Button from '@/components/ui/Button/ButtonWithLoadingState';
import AddBlog from '@/components/Blogs/addBlogs';
import useAddBlog from '@/hooks/Blog/useAddBlog';
import UpdateBlogModal from '@/components/Blogs/updateBlogModal';

export default function BlogHomePage() {
    const { allBlogs, isBlogBeingfetched, isFetchingNextPage, fetchNextPage } = useFetchBlogs();
    const { handleOpenAddBlogModal, handleCloseAddBlogModal, showAddBlogModal, handleAddNewBlog, isNewBlogBeingCreated, handleCloseUpdateBlogModal, ShowUpdateBlogModal, handleUpdateBlog, handleSubmitUpdatedBlog, blogData } = useAddBlog();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);


    if (isBlogBeingfetched) {
        return <Loader />
    }

    return (
        <div className="w-full  flex flex-col gap-4 p-4">
            <div className='w-full max-h-[50px] flex items-end justify-end '>
                <Button onClick={handleOpenAddBlogModal} className=''> Add Blog</Button>
            </div>
            {isBlogBeingfetched && !allBlogs ? (
                <Loader />
            ) : allBlogs && allBlogs.pages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {allBlogs.pages.map((page) =>
                        //@ts-expect-error: blog implicptly has type any
                        page?.data?.data?.posts.map(blog => (
                            <Blog
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                created_at={new Date(blog.created_at)}
                                author={blog?.author?.name}
                                category={blog.category}
                                tags={blog.tags}
                                content={blog.content}
                                handleUpdateBlog={handleUpdateBlog}
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
            <AddBlog
                show={showAddBlogModal}
                closeModal={handleCloseAddBlogModal}
                title="Add Blog"
                handleAddNewBlog={handleAddNewBlog}
                isNewBlogBeingAdded={isNewBlogBeingCreated}
            />
            <UpdateBlogModal
                show={ShowUpdateBlogModal}
                closeModal={handleCloseUpdateBlogModal}
                title="Update Blog"
                isNewBlogBeingAdded={true}
                handleSubmitUpdatedBlog={handleSubmitUpdatedBlog}
                blogData={blogData}
            />
        </div>
    );
}

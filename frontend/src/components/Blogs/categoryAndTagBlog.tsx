import React from 'react'
import Blog from '../BlogCard/blog';
import { cn } from '@/utils/cn';

export default function CategoryAndTagBlog({
    title,
    posts,
    active,
    setActive,
    categories,
}: {
    title: string
    posts: any,
    active?: number,
    categories?: any
    setActive: (active: number) => void;
}) {
    return (
        <div className='p-4 flex  gap-8'>

            <div className="px-8 h-screen  max-h-[calc(100%-200px)] overflow-y-scroll scrollbar-none border-r border-blue-100">
                {posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                        {
                            //@ts-expect-error
                            posts.map((blog) =>

                                <Blog
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.title}
                                    created_at={new Date(blog.created_at)}
                                    author={blog?.author?.name}
                                    category={blog.category}
                                    tags={blog.tags}
                                    content={blog.content}
                                    handleUpdateBlog={() => { }}
                                />

                            )}
                    </div>
                ) : (
                    <p>No blogs available.</p>
                )}

            </div>
            <div className="w-[350px] flex flex-col  flex-wrap justify-start items-start gap-6 p-0">
                <h1 className='text-2xl font-bold '>{title}</h1>
                <div className='flex gap-4'>

                    {
                        //@ts-expect-error: category has type any
                        categories?.map((category) => (
                            <span
                                key={category.id}
                                onClick={() => setActive(category.id)}
                                className={cn(
                                    "cursor-pointer bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full",
                                    active === category.id ? "bg-blue-500 text-white" : ""
                                )}
                            >
                                {category.name}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    )
}

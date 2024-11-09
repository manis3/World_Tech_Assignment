'use client'
import Blog from '@/components/BlogCard/blog';
import CategoryAndTagBlog from '@/components/Blogs/categoryAndTagBlog';
import Loader from '@/components/ui/Loader/Loader';
import useFetchPostByCategory from '@/query/Category/useFetchBlogByCategory';
import useFetchCategory from '@/query/Category/useFetchCategory'
import { cn } from '@/utils/cn';
import React, { useState } from 'react'

export default function BlogCategory() {
    const [activeCategory, setActiveCategory] = useState<number>()
    const { allCategory } = useFetchCategory();
    const { categoryPost, isCategoryPostBeingFetched } = useFetchPostByCategory(activeCategory)


    if (isCategoryPostBeingFetched) {
        return <Loader />
    }
    return (
        <div className='max-w-[1650px]   pt-10 mx-auto bg-blue-50'>
            <CategoryAndTagBlog
                posts={categoryPost}
                active={activeCategory}
                setActive={setActiveCategory}
                categories={allCategory}
                title={"Categories"}
            />
        </div >
    )
}

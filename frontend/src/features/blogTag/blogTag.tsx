'use client'
import CategoryAndTagBlog from '@/components/blogs/categoryAndTagBlog';
import Loader from '@/components/ui/Loader/Loader';
import useFetchAllTags from '@/query/tag/useFetchAllTags';
import useFetchPostByTag from '@/query/tag/useFetchPostByTag';
import React, { useState } from 'react'

export default function BlogTag() {
    const [activeCategory, setActiveCategory] = useState<number>()
    const { allTags } = useFetchAllTags();
    const { tagPosts, isTagPostBeingFetched } = useFetchPostByTag(activeCategory)

    console.log(tagPosts, "tagpost ko value")
    if (isTagPostBeingFetched) {
        return <Loader />
    }
    return (
        <div className='max-w-[1650px]   pt-10 mx-auto bg-blue-50'>
            <CategoryAndTagBlog
                posts={tagPosts}
                active={activeCategory}
                setActive={setActiveCategory}
                categories={allTags}
                title={"Tags"}
            />
        </div >
    )
}

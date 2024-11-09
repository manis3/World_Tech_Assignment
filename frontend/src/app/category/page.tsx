import { Seo } from '@/components/Seo/seo'
import BlogCategory from '@/features/blogCategory/blogCategory'
import React from 'react'

export default function Category() {
    return (
        <div>
            <Seo title="Category" />
            <BlogCategory />

        </div>
    )
}

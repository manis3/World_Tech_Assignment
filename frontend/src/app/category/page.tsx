import { Seo } from '@/components/seo/seo'
import BlogCategory from '@/features/blogCategory/blogCategory'
import React from 'react'

export default function CategoryPage() {
    return (
        <>
            <Seo title="Category" />
            <BlogCategory />
        </>
    )
}

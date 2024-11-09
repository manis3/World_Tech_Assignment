"use client"
import { Seo } from '@/components/Seo/seo'
import BlogDetails from '@/features/DetailsPage/blogDetails'
import React from 'react'

export default function BlogDetailsPage() {
    return (
        <div>
            <Seo title="Details page" />
            <BlogDetails />
        </div>
    )
}

import { Seo } from '@/components/Seo/seo'
import BlogTag from '@/features/blogTag/blogTag'
import React from 'react'

export default function TagsPage() {
  return (
    <>
      <Seo title="Tags" />
      <BlogTag />
    </>
  )
}

import { Seo } from '@/components/seo/seo'
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

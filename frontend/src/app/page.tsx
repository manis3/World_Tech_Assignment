'use-client'

import React from 'react';
import { Seo } from '@/components/Seo/seo';
import BlogHomePage from '@/features/HomePage/blogHome';

export default function Home() {
  return (
    <div className='w-[1650px] max-w-[1650px] h-auto mx-auto'>
      <Seo title="Blogs" />
      <BlogHomePage />
    </div>
  );
}

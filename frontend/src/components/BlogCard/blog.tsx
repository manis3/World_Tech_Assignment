import React from 'react';
import { Card } from '../ui/card';
import Button from '../ui/Button/ButtonWithLoadingState';
import { Edit2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ITagOrCategory {
    id: number;
    name: string;
}

export default function Blog({
    id,
    title,
    created_at,
    author,
    category,
    tags,
    content,
    handleUpdateBlog
}: {
    id: number
    title: string;
    created_at: Date;
    author: string;
    category: ITagOrCategory;
    tags: ITagOrCategory[];
    content: string;
    handleUpdateBlog: (id: number) => void;
}) {
    const router = useRouter();
    const handleReadMore = (id: number) => {
        router.push(`/blog/${id}`);
    }
    return (
        <>
            <Card className="relative max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-4 hover:bg-gray-100 hover:scale-100 hover:shadow-xl transition-all duration-300 ease-in-out group">
                <Button variant={'link'} onClick={() => handleUpdateBlog?.(id)} className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Edit2Icon className="w-4 h-4 cursor-pointer" />
                </Button>
                <div>
                    <h2 className="text-xl font-bold text-text-grayscaleGhostWhite">{title}</h2>
                    <p className="text-sm text-text-ghostWhite mt-1">Published on {created_at.toLocaleDateString()}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 text-sm font-medium">{author}</span>

                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {category?.name}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags?.map((data) => (
                        <span key={data.id} className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                            {data.name}
                        </span>
                    ))}
                </div>

                <div className='min-h-[50px] max-h-8'>
                    <p>{`${content.slice(0, 120)}...`}</p>
                </div>
                <Button variant={'link'} className='!p-0' onClick={() => handleReadMore(id)}> Read More</Button>
            </Card>

        </>
    );
}
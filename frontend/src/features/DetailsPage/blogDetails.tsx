import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button/buttonWithLoadingState';
import { Textarea } from '@/components/ui/textArea/textArea';
import useFetchBlogById from '@/query/blogQuery/useFetchBlogById';
import usePostComment from '@/query/comment/usePostComment';
import { useSearchParams } from 'next/navigation';


export default function BlogDetails() {
    const searchParams = useSearchParams()
    const id = Number(searchParams.get('id'));
    const { blogData } = useFetchBlogById(id)
    const { postComment, isCommentBeingPosted } = usePostComment();
    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = () => {
        const payload = {
            postId: id,
            content: newComment,
        }
        postComment(payload);
        setNewComment('')


    };

    return (
        <div className='w-auto max-w-[850px]  mx-auto flex flex-col items-center justify-start mt-10 '>
            <h1 className='font-bold text-[28px] py-6'>Blog Details</h1>
            <div className='   flex items-center justify-center'>
                <Card className="relative max-w-3xl min-h-auto mx-auto bg-blue-50 border border-gray-200 rounded-lg  p-6 space-y-5 ">
                    <div>
                        <h2 className="text-3xl font-bold text-text-grayscaleLicorice">{blogData?.title}</h2>
                        <p className="text-md text-text-ghostWhite mt-1">Published on {new Date(blogData?.created_at).toLocaleTimeString()}</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-gray-700 text-md font-medium">{(blogData?.author?.name)}</span>
                        <span className="bg-blue-100 text-blue-800 text-md font-semibold px-2 py-1 rounded">
                            {blogData?.category?.name}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {
                            //@ts-expect-error: type
                            blogData?.tags?.map((tag) => (
                                <span key={tag} className="bg-gray-200 text-gray-700 text-md font-medium px-3 py-1 rounded-full">
                                    {tag.name}
                                </span>
                            ))}
                    </div>

                    <div className="mt-4">
                        <p className='text-[14px]'>
                            {blogData?.content}
                        </p>
                    </div>

                    {/* Comment Section */}
                    <div className="!mt-16">
                        <h3 className="text-lg font-semibold text-gray-800">Comments</h3>

                        {/* Existing Comments */}
                        <div className="space-y-4 mt-4">

                            {
                                //@ts-expect-error: type any
                                blogData?.Comment.map((comment) => (
                                    <div key={comment.id} className="border-t border-gray-300 pt-2">
                                        <p className="text-sm text-gray-700">{comment.content}</p>
                                        <div className="text-xs text-gray-500 mt-1">
                                            - {comment.author?.name}, {comment.created_at}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Comment Form */}
                        <div className="mt-6">
                            <h4 className="text-md font-medium text-gray-700 mb-2">Add a Comment</h4>
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                className="w-full border-gray-300 p-2 rounded-md"
                            />
                            <Button onClick={handleCommentSubmit} className="mt-6" loading={isCommentBeingPosted}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

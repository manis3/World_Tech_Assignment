import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/input/default';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button/ButtonWithLoadingState';
import { cn } from '@/utils/cn';
import { Textarea } from '../ui/Textarea/Textarea';
import { ICreateBlogProps } from '@/types/blogTypes';
import useFetchCategory from '@/query/Category/useFetchCategory';
import useFetchAllTags from '@/query/Tag/useFetchAllTags';

const newBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

export default function UpdateBlogModal({
    show,
    closeModal,
    title,
    showCloseIcon = true,
    className,
    handleSubmitUpdatedBlog,
    isNewBlogBeingAdded,
    blogData,
}: {
    show: boolean;
    closeModal: () => void;
    title: string;
    showCloseIcon?: boolean;
    className?: string;
    handleSubmitUpdatedBlog: (data: ICreateBlogProps) => void;
    isNewBlogBeingAdded: boolean;
    blogData: any
}) {
    const { allCategory } = useFetchCategory();
    const { allTags } = useFetchAllTags();


    const methods = useForm<ICreateBlogProps>({
        resolver: zodResolver(newBlogSchema),
        defaultValues: {
            title: blogData?.title || '',
            content: blogData?.content || '',
            categoryId: blogData?.category?.id || null,
            //@ts-expect-error
            tagIds: blogData?.tags?.map(tag => tag.id) || [],
        },
    });


    useEffect(() => {
        if (blogData) {
            methods.reset({
                title: blogData?.title || '',
                content: blogData?.content || '',
                categoryId: blogData?.category?.id || null,
                //@ts-expect-error
                tagIds: blogData?.tags?.map(tag => tag.id) || [],
            });
            setSelectedCategory(blogData?.category?.id || null);
            //@ts-expect-error
            setSelectedTags(blogData?.tags?.map(tag => tag.id) || []);
        }
    }, [blogData, methods]);


    const [selectedCategory, setSelectedCategory] = useState<number | null>(blogData?.category?.id || null);
    //@ts-expect-error
    const [selectedTags, setSelectedTags] = useState<number[]>(blogData?.tags?.map(tag => tag.id) || []);

    const onSubmit = (data: ICreateBlogProps) => {
        const payload = {
            ...data,
            categoryId: selectedCategory,
            tagIds: selectedTags
        };
        handleSubmitUpdatedBlog(payload);
        closeModal();
    };

    const toggleTagSelection = (tagId: number) => {
        setSelectedTags((prev) =>
            prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
        );
    };

    return (
        <Modal show={show} closeModal={closeModal} title={title} showCloseIcon={showCloseIcon} className={cn("bg-background", className)}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8 py-4">
                <div className="flex items-center justify-center gap-16">
                    <h1 className="text-right font-medium">Title</h1>
                    <Controller
                        name="title"
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                type="text"
                                variant='secondary'
                                className="w-auto flex-1 p-2"
                                onChange={(e) => {
                                    onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>

                <div className="flex items-center justify-center gap-10">
                    <h1 className="text-right font-medium">Content</h1>
                    <Controller
                        name="content"
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <Textarea
                                value={value}
                                className="w-auto flex-1 p-2 bg-foreground"
                                onChange={(e) => {
                                    onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <h1 className="text-right font-medium">Category</h1>
                    {allCategory && allCategory.length > 0 ? (
                        //@ts-expect-error
                        allCategory.map((category) => (
                            <span
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={cn(
                                    "cursor-pointer ml-5 bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full",
                                    selectedCategory === category.id ? "bg-blue-500 text-white" : ""
                                )}
                            >
                                {category.name}
                            </span>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>

                <div className="flex flex-wrap gap-4">
                    <h1 className="text-right font-medium">Tags</h1>
                    {allTags && allTags.length > 0 ? (
                        //@ts-expect-error
                        allTags.map((tag) => (
                            <span
                                key={tag.id}
                                onClick={() => toggleTagSelection(tag.id)}
                                className={cn(
                                    "cursor-pointer ml-12 bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full",
                                    selectedTags.includes(tag.id) ? "bg-blue-500 text-white" : ""
                                )}
                            >
                                {tag.name}
                            </span>
                        ))
                    ) : (
                        <p>No tags available</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <Button variant="default" type="submit" className="ml-auto" >
                        Update Blog
                    </Button>
                </div>
            </form>
        </Modal >
    );
}
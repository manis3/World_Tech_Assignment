import React, { useState } from 'react';
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


const tagOptions = [
    { id: 1, name: 'React' },
    { id: 2, name: 'JavaScript' },
    { id: 3, name: 'UI/UX' }
];

const newBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});


export default function AddBlog({
    show,
    closeModal,
    title,
    showCloseIcon = true,
    className,
    handleAddNewBlog,
    isNewBlogBeingAdded
}: {
    show: boolean;
    closeModal: () => void;
    title: string;
    showCloseIcon?: boolean;
    className?: string;
    handleAddNewBlog: (data: ICreateBlogProps) => void;
    isNewBlogBeingAdded: boolean;
}) {
    const { allCategory } = useFetchCategory()
    const { allTags } = useFetchAllTags();
    const methods = useForm<ICreateBlogProps>({
        resolver: zodResolver(newBlogSchema),
        defaultValues: {
            title: '',
            content: '',
            categoryId: null,
            tagIds: []
        },
    });

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const onSubmit = (data: ICreateBlogProps) => {
        const payload = {
            ...data,
            categoryId: selectedCategory,
            tagIds: selectedTags
        };
        handleAddNewBlog(payload);
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
                        render={({ field }) => (
                            <Input
                                type="text"
                                variant='secondary'
                                className="w-auto flex-1 p-2"
                                {...field}
                            />
                        )}
                    />
                </div>

                <div className="flex items-center justify-center gap-10">
                    <h1 className="text-right font-medium">Content</h1>
                    <Controller
                        name="content"
                        control={methods.control}
                        render={({ field }) => (
                            <Textarea
                                className="w-auto flex-1 p-2 bg-foreground"
                                {...field}
                            />
                        )}
                    />
                </div>

                <div className="flex items-center justify-Start gap-10">
                    <h1 className="text-right font-medium">Category</h1>
                    <div className="flex flex-wrap gap-2">

                        {
                            //@ts-expect-error: category has type any
                            allCategory?.map((category) => (
                                <span
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={cn(
                                        "cursor-pointer bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full",
                                        selectedCategory === category.id ? "bg-blue-500 text-white" : ""
                                    )}
                                >
                                    {category.name}
                                </span>
                            ))}
                    </div>
                </div>

                <div className="flex items-center justify-start gap-16">
                    <h1 className="text-right font-medium">Tags</h1>
                    <div className="flex flex-wrap gap-2">

                        {
                            //@ts-expect-error: tag has type any
                            allTags?.map((tag) => (
                                <span
                                    key={tag.id}
                                    onClick={() => toggleTagSelection(tag.id)}
                                    className={cn(
                                        "cursor-pointer bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full",
                                        selectedTags.includes(tag.id) ? "bg-blue-500 text-white" : ""
                                    )}
                                >
                                    {tag.name}
                                </span>
                            ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button variant="default" type="submit" className="ml-auto" loading={isNewBlogBeingAdded}>
                        Add Blog
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
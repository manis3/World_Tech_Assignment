export type ICreateBlogProps = {
    title: string;
    content: string;
    categoryId: number | null;
    tagIds: number[];
};

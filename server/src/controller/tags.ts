import { NextFunction, Request, Response } from 'express';
import { NotFound } from './notFound';
import prismaClient from '../../Db/db.config';

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    NotFound(name, 'Please enter a tag name', next)
    const tag = await prismaClient.tag.create({ data: { name } });
    res.json({ message: " Tag created successfully!", data: { tag } })
}

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
    const tags = await prismaClient.tag.findMany();
    res.json({ message: 'Tag fetched successfully', tags });

}

export const getPostByTag = async (req: Request, res: Response, next: NextFunction) => {
    const tagIdParam = req.query.id as string;
    let tagId;
    if (tagIdParam && !isNaN(Number(tagIdParam)) && tagIdParam !== 'undefined') {
        tagId = parseInt(tagIdParam);
    } else {
        tagId = undefined;
    }
    const posts = await prismaClient.post.findMany({
        where: tagId ? { tags: { some: { id: tagId } } } : {},
        include: {
            author: true,
            Comment: {
                include: {
                    author: true,
                },
            },
            category: true,
            tags: true,
        },
    });

    res.json({ message: 'Post fetched Successfully', data: { posts } });

};


export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const tagId = parseInt(req.query.id as string);
    NotFound(tagId, 'Tag not found!', next);

    const tag = await prismaClient.tag.findUnique({ where: { id: tagId } });
    NotFound(tag?.id, 'Tag not found!', next);

    const updateTag = await prismaClient.tag.update({
        where: { id: tagId },
        data: {
            name
        },
    });
    res.json({ message: "Tag updated successfully", data: { updateTag } })
}


export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {

    const tagId = parseInt(req.query.id as string);
    NotFound(tagId, 'Tag Not found', next);

    const tag = await prismaClient.tag.findUnique({ where: { id: tagId } });
    NotFound(tag?.id, 'Tag not found!', next);

    const deleteTag = await prismaClient.tag.delete({ where: { id: tagId } });

    res.json({ message: "Tag deleted successfully", deleteTag });
}
import { NextFunction, Request, Response } from "express";
import prismaClient from "../../Db/db.config";
import { NotFound } from "./notFound";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  NotFound(name, 'Please enter a category name', next)
  const category = await prismaClient.category.create({ data: { name } });
  res.json({ message: 'category created successfully', category })

}

export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  const categories = await prismaClient.category.findMany();
  res.json({ message: 'category fetched successfully', categories });

}

export const getPostByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const categoryIdParam = req.query.id as string;

  let categoryId;
  if (categoryIdParam && !isNaN(Number(categoryIdParam)) && categoryIdParam !== 'undefined') {
    categoryId = parseInt(categoryIdParam);
  } else {
    categoryId = undefined;
  }
  const posts = await prismaClient.post.findMany({
    where: categoryId ? { categoryId } : {},
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

  res.json({ message: 'Posts fetched successfully', posts });
};


export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const categoryId = parseInt(req.query.id as string);
  NotFound(categoryId, 'Category not found!', next);

  const category = await prismaClient.category.findUnique({ where: { id: categoryId } });
  NotFound(category?.id, 'Category not found!', next);

  const updateCategory = await prismaClient.category.update({
    where: { id: categoryId },
    data: {
      name
    },
  });
  res.json({ message: "category updated successfully", updateCategory })
}


export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {

  const categoryId = parseInt(req.query.id as string);
  NotFound(categoryId, 'Category Not found', next);

  const category = await prismaClient.category.findUnique({ where: { id: categoryId } });
  NotFound(category?.id, 'Category not found!', next);

  const deleteCategory = await prismaClient.category.delete({ where: { id: categoryId } });

  res.json({ message: "category deleted successfully", deleteCategory });
}
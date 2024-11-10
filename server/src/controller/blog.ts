import { NextFunction, Request, Response } from 'express'
import prismaClient from '../../Db/db.config'
import { BadRequestException } from '../error/badRequest'
import { ErrorCode } from '../consts/errorCode'
import { NotFound } from './notFound'

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title,
    content,
    categoryId,
    tagIds,
  }: { title: string; content: string; categoryId: number; tagIds: number[] } =
    req.body

  const userId = req?.user?.id

  if (!userId) {
    return next(
      new BadRequestException('Unauthorized ', ErrorCode.UNAUTHORIZED),
    )
  }
  const post = await prismaClient.post.create({
    data: {
      title,
      content,
      categoryId,
      authorId: userId,
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
    include: { tags: true },
  })
  res.json({ message: 'Post created successfully', data: post })
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  const skip = (page - 1) * limit;

  const posts = await prismaClient.post.findMany({
    take: limit,
    skip: skip,
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
    orderBy: {
      created_at: 'desc'
    }
  });

  const totalPosts = await prismaClient.post.count();

  const nextPage = posts.length < limit ? null : page + 1;

  res.json({
    message: 'Posts fetched successfully',
    data: {
      posts,
      nextPage,
      totalPosts,
    }
  });
}

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = parseInt(req.params.id as string);

  NotFound(postId, 'Post not found!', next)


  const post = await prismaClient.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      category: true,
      tags: true,
      Comment: {
        include: {
          author: true,
        },
      },
    },
  });

  NotFound(postId, 'Post not found!', next)


  res.json({
    message: 'Post fetched successfully',
    data: post,
  });
};


export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req?.user?.id
  const userPosts = await prismaClient.post.findMany({
    where: { authorId: Number(userId) },
    include: {
      category: true,
      tags: true,
      // comments: true,
      author: true,
    },

  })

  res.json({ message: 'User post successfully', userPosts })
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req?.user?.id
  console.log(req.query)
  const postId = parseInt(req.query.id as string)
  console.log('post id ko value', postId)
  const { title, content, categoryId, tags } = req.body

  const post = await prismaClient.post.findUnique({
    where: { id: postId },
    include: { author: true },
  })

  if (!post) {
    return next(
      new BadRequestException('Post not found!', ErrorCode.USER_NOT_FOUND),
    )
  }

  if (post.authorId !== userId) {
    return next(
      new BadRequestException(
        'You cant update this post',
        ErrorCode.UNACCESSIBLE,
      ),
    )
  }

  const updatePost = await prismaClient.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      categoryId,
      updated_at: new Date(),
      tags: {
        set: tags,
      },
    },
    include: {
      category: true,
      tags: true,
      author: true,
    },
  })

  res.json({ message: 'Post Updated Successfully!', updatePost })
}

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = parseInt(req.query.id as string)

  const post = await prismaClient.post.findUnique({
    where: { id: postId },
    include: { author: true },
  })
  if (!post) {
    return next(
      new BadRequestException('Post not found', ErrorCode.USER_NOT_FOUND),
    )
  }

  const deletePost = await prismaClient.post.delete({
    where: { id: postId },
  })
  res.json({ message: 'Post deleted successfully!', deletePost })
}

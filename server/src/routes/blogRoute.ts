import { Router } from 'express'
import { errorHandler } from '../errorHandler'
import { authMiddleware } from '../middleware/auth'
import {

  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePost,
} from '../controller/blog'

const blogRoutes: Router = Router()

blogRoutes.get('/all', errorHandler(getAllPosts));
blogRoutes.get('/:id', [authMiddleware], errorHandler(getPostById));
blogRoutes.post('/create-post', [authMiddleware], errorHandler(createPost));
blogRoutes.get('/user-posts', [authMiddleware], errorHandler(getUserPosts));
blogRoutes.put('/update-post', [authMiddleware], errorHandler(updatePost));
blogRoutes.delete('/delete-post', [authMiddleware], errorHandler(deletePost));

export default blogRoutes

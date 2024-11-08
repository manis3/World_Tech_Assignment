import { Router } from 'express'
import { errorHandler } from '../errorHandler'
import { authMiddleware } from '../middleware/auth'
import {
  createBlog,
  deletePost,
  getAllPosts,
  getUserPosts,
  updatePost,
} from '../controller/blog'

const blogRoutes: Router = Router()

blogRoutes.get('/all', errorHandler(getAllPosts));
blogRoutes.post('/create-blog', [authMiddleware], errorHandler(createBlog));
blogRoutes.get('/user-posts', [authMiddleware], errorHandler(getUserPosts));
blogRoutes.put('/update-post', [authMiddleware], errorHandler(updatePost));
blogRoutes.delete('/delete-post', [authMiddleware], errorHandler(deletePost));

export default blogRoutes

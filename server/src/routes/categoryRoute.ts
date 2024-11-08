import { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import { errorHandler } from '../errorHandler'
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getPostByCategory,
  updateCategory,
} from '../controller/category'

const categoryRoutes: Router = Router()

categoryRoutes.post('/create', authMiddleware, errorHandler(createCategory))
categoryRoutes.get('/get-all-category', authMiddleware, errorHandler(getAllCategory))
categoryRoutes.get(
  '/get-category-post',
  authMiddleware,
  errorHandler(getPostByCategory),
)
categoryRoutes.put('/update', authMiddleware, errorHandler(updateCategory))
categoryRoutes.delete('/delete', authMiddleware, errorHandler(deleteCategory))

export default categoryRoutes

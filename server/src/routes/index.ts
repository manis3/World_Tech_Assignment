import { Router } from 'express'
import authRoutes from './auth'
import blogRoutes from './blogRoute'
import categoryRoutes from './categoryRoute'
import tagRoutes from './tagRoute'
import commentRoutes from './commentRoute'

const router: Router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/blog', blogRoutes)
router.use('/api/category', categoryRoutes)
router.use('/api/tag', tagRoutes)
router.use('/api/comment', commentRoutes)

export default router

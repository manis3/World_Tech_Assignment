import { Router } from 'express'
import {
  getLoggedInUserData,
  login,
  requestRessetPasssword,
  resetPassword,
  signup,
} from '../controller/auth'
import { errorHandler } from '../errorHandler'
import { authMiddleware } from '../middleware/auth'

const authRoutes: Router = Router()

authRoutes.post('/login', errorHandler(login))
authRoutes.post('/signup', errorHandler(signup))
authRoutes.get('/me', [authMiddleware], errorHandler(getLoggedInUserData))
authRoutes.post('/request-otp', errorHandler(requestRessetPasssword))
authRoutes.post('/reset-password', errorHandler(resetPassword))

export default authRoutes

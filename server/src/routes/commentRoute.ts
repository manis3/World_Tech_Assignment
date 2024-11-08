import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { createComment } from '../controller/comment';
import { errorHandler } from '../errorHandler';

const commentRoutes: Router = Router();

commentRoutes.post('/create', [authMiddleware], errorHandler(createComment));

export default commentRoutes;
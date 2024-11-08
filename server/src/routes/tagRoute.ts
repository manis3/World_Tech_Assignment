import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { errorHandler } from '../errorHandler';
import { createTag, deleteTag, getAllTags, getPostByTag, updateTag } from '../controller/tags';

const tagRoutes: Router = Router();

tagRoutes.post('/create', authMiddleware, errorHandler(createTag));
tagRoutes.get("/get-all", authMiddleware, errorHandler(getAllTags));
tagRoutes.get("/get-post", authMiddleware, errorHandler(getPostByTag));
tagRoutes.put("/update", authMiddleware, errorHandler(updateTag));
tagRoutes.delete("/delete", authMiddleware, errorHandler(deleteTag));


export default tagRoutes;
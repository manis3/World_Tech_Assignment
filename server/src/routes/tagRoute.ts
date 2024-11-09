import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { errorHandler } from '../errorHandler';
import { createTag, deleteTag, getAllTags, getPostByTag, updateTag } from '../controller/tags';

const tagRoutes: Router = Router();

tagRoutes.get("/get-post", errorHandler(getPostByTag));
tagRoutes.get("/get-all", errorHandler(getAllTags));
tagRoutes.post('/create', authMiddleware, errorHandler(createTag));
tagRoutes.put("/update", authMiddleware, errorHandler(updateTag));
tagRoutes.delete("/delete", authMiddleware, errorHandler(deleteTag));


export default tagRoutes;
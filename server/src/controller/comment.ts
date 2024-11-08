import { NextFunction, Request, Response } from "express";
import { UnAuthorizedHttpException } from "../error/unAuthorizedException";
import { ErrorCode } from "../consts/errorCode";
import prismaClient from "../../Db/db.config";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { postId, content } = req.body;
    console.log(req.body)
    const userId = req?.user?.id;
    if (!userId) {
        return next(new UnAuthorizedHttpException('unauthorized', ErrorCode.UNAUTHORIZED));
    }
    const comment = await prismaClient.comment.create({
        data: {
            content,
            authorId: userId,
            postId
        },
    });
    res.json({ message: "Comment created successfully!", data: { comment } })

}
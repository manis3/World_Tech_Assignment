import { NextFunction, Request, Response } from 'express'
import { UnAuthorizedHttpException } from '../error/unAuthorizedException'
import { ErrorCode } from '../consts/errorCode'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../secrets'
import prismaClient from '../../Db/db.config'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //1. extract the token from the header;
  const token = req.headers.authorization

  //2. if token iss not preset in the request, throw an error of unauthorized;
  if (!token) {
    return next(
      new UnAuthorizedHttpException('Unauthorized', ErrorCode.UNAUTHORIZED),
    )
  }

  try {
    //3. if the token is preset, verify that token and exteract the payload;

    const payload = jwt.verify(token, JWT_SECRET) as any

    //4. get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.id },
    })
    if (!user) {
      return next(
        new UnAuthorizedHttpException('unauthorized', ErrorCode.UNAUTHORIZED),
      )
    }

    //5. attached the user to the current request object
    req.user = user
    next()
  } catch (err) {
    return next(
      new UnAuthorizedHttpException('unauthorized', ErrorCode.UNAUTHORIZED),
    )
  }
}

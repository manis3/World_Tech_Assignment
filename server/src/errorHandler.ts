import { NextFunction, Request, Response } from 'express'
import { ErrorCode } from './consts/errorCode'
import { InternalException } from './error/internalExceptation'
import { HttpException } from './error/root'

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next)
    } catch (err) {
      let exception: HttpException
      if (err instanceof HttpException) {
        exception = err
      } else {
        exception = new InternalException(
          'Something went wrong',
          err,
          ErrorCode.INTERNAL_SERVER_ERROR,
        )
      }
      next(exception)
    }
  }
}

import { HttpException } from '../error/root'
import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
    errors: err.errors,
  })
}

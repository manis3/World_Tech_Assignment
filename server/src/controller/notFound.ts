import { NextFunction } from 'express'
import { ErrorCode } from '../consts/errorCode'
import { BadRequestException } from '../error/badRequest'

export const NotFound = (
  id: number | string | undefined,
  message: string,
  next: NextFunction,
) => {
  if (!id) {
    next(new BadRequestException(message, ErrorCode.USER_NOT_FOUND))
  }
}

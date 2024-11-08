//message, status code, error codes

import { ErrorCode } from '../consts/errorCode'

export class HttpException extends Error {
  message: string
  errorCode: any
  statusCode: number
  errors: ErrorCode

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    error: any,
  ) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errors = error
  }
}

import { HttpException } from './root'

export class ValidateFormData extends HttpException {
  constructor(message: string, errorCode: number, error: any) {
    super(message, errorCode, 422, error)
  }
}

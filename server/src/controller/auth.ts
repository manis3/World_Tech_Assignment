import prismaClient from '../../Db/db.config'
import { NextFunction, Request, Response } from 'express'
import { compareSync, hash, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../secrets'
import { ErrorCode } from '../consts/errorCode'
import { SignupSchema } from '../schema/users'
import { BadRequestException } from '../error/badRequest'
import { NotFoundException } from '../error/notFound'
import { sentOPTEmail } from '../utils/email'
import { NotFound } from './notFound'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  SignupSchema.parse(req.body)
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user) {
    return next(
      new BadRequestException(
        'User already exists',
        ErrorCode.USER_ALREADY_EXIST,
      ),
    )
  }

  const newUser = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
    },
  })

  res
    .status(201)
    .json({ status: 200, message: 'User created successfully', user: newUser })
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body

  let user = await prismaClient.user.findFirst({ where: { email } })
  NotFound(user?.id, 'user not found', next)

  if (!compareSync(password, user?.password || '')) {
    return next(
      new BadRequestException('Incorrect password', ErrorCode.INVALID_REQUEST),
    )
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET,
  )

  res
    .status(200)
    .json({ message: 'Login successfull', token: token, user: user })
}

export const getLoggedInUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.json(req.user)
}

export const requestRessetPasssword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body

  const user = await prismaClient.user.findUnique({ where: { email } })
  if (!user) {
    return next(
      new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND),
    )
  }

  const otp = Math.floor(10000 + Math.random() * 90000).toString()

  const otpExpire = new Date(Date.now() + 10 * 60 * 1000)

  await prismaClient.user.update({
    where: { email },
    data: { otp, otpExpire },
  })

  //send otp to email
  await sentOPTEmail(email, otp)

  res.json({ message: 'Password reset OTP send to email!' })
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, otp, newPassword } = req.body

  const user = await prismaClient.user.findUnique({ where: { email } })
  if (!user) {
    return next(
      new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND),
    )
  }

  if (user.otp !== otp || !user.otpExpire || user.otpExpire < new Date()) {
    return next(
      new BadRequestException(
        'Invalid or Expired OTP',
        ErrorCode.INVALID_REQUEST,
      ),
    )
  }

  const hashPassword = await hash(newPassword, 10)

  //update users's password and clear otp field
  await prismaClient.user.update({
    where: { email },
    data: {
      password: hashPassword,
      otp: null,
      otpExpire: null,
    },
  })
  res.json({ message: 'Password reset successfully' })
}

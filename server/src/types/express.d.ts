// src/@types/express.d.ts
import { User } from '@prisma/client'
import express from 'express'
declare module 'express' {
  export interface Request {
    user?: User // Make it optional if user may not always be present
  }
}

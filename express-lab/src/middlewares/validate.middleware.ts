import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(createError(400, errors.array()[0]?.msg))
  next()
}

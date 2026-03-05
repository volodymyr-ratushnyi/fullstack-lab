import type {NextFunction, Request, Response} from 'express'

const roleMiddleware = (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction) =>
    req.user?.role !== requiredRole
      ? res.status(403).json({ message: 'Access forbidden' })
      : next()

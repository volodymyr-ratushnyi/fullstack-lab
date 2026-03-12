import {config} from '@auth/config/config.ts'
import {type NextFunction, type Request, type Response, Router} from 'express'
import {body} from 'express-validator'
import {login, register} from '@auth/services/auth.service.ts'
import type {CredentialsDto, RegisterUserDto} from '@auth/dtos/auth.dto.ts'
import createError from 'http-errors'
import ms from 'ms'
import {validateMiddleware} from 'src/middlewares/validate.middleware.ts'

const router = Router()

router.post('/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password.')
      }
      return true
    })
  ],
  validateMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const user: RegisterUserDto = req.body
    await register(user)
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' })
      })
      .catch((err) => {
        next(err)
      })
  }
)

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const credentials: CredentialsDto = req.body
  await login(credentials)
    .then((token) => {
      res.cookie('token', token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'test',
        sameSite: 'lax',
        maxAge: ms(config.jwt.expiresIn)
      })
      res.status(200).json({ message: 'Logged in successfully' });
    })
    .catch((message) => {
      next(createError(400, message))
    })
})

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ms(config.jwt.expiresIn)
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

export default router

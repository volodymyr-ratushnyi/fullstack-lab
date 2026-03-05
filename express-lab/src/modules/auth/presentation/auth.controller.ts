import {config} from '@auth/config/config.ts'
import express, {type Request, type Response} from "express"
import {body, validationResult} from 'express-validator'
import {login, register} from '@auth/services/auth.service.ts'
import type {LoginUserDto, RegisterUserDto} from '@auth/dtos/auth.dto.ts'
import ms from 'ms'

const router = express.Router()

router.post('/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const user: RegisterUserDto = req.body
    await register(user)
    res.status(201).json({ message: 'User registered successfully' })
  }
)

router.post('/login', async (req: Request, res: Response) => {
  const user: LoginUserDto = req.body
  await login(user)
    .then((token) => {
      res.cookie('token', token, {
        signed: true,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: ms(config.jwt.expiresIn)
      })
      res.status(200).json({ message: 'Logged in successfully' });
    })
    .catch((message) => {
      res.status(400).json({ message })
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

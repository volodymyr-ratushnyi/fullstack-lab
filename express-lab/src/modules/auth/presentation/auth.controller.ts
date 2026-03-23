import type {LoginUseCase} from '@auth/application/login.use-case.ts'
import type {RegisterUseCase} from '@auth/application/register.use-case.ts'
import {config} from '@auth/config/config.ts'
import type {CredentialsDto, RegisterUserDto} from '@auth/domain/dtos/auth.dto.ts'
import type {NextFunction, Request, Response} from 'express'
import ms from 'ms'
import createError from 'http-errors'

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  public async register(req: Request<unknown, unknown, RegisterUserDto>, res: Response, next: NextFunction) {
    await this.registerUseCase.execute(req.body)
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' })
      })
      .catch((err) => {
        next(err)
      })
  }

  public async login(req: Request<unknown, unknown, CredentialsDto>, res: Response, next: NextFunction) {
    try {
      const token = await this.loginUseCase.execute(req.body)
      res.cookie('token', token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'test',
        sameSite: 'lax',
        maxAge: ms(config.jwt.expiresIn)
      })
      res.status(200).json({ message: 'Logged in successfully' })
    } catch (error) {
      next(createError(400, error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  public logout(req: Request, res: Response) {
    res.clearCookie('token', {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms(config.jwt.expiresIn)
    })

    res.status(200).json({ message: 'Logged out successfully' })
  }
}

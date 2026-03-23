import {authController} from '@auth/composition-root.ts'
import type {CredentialsDto, RegisterUserDto} from '@auth/domain/dtos/auth.dto.ts'
import {type NextFunction, type Request, type Response, Router} from 'express'
import {body} from 'express-validator'
import {validateMiddleware} from 'src/middlewares/validate.middleware.ts'

const router = Router()

router.post('/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== (req.body as RegisterUserDto).password) {
        throw new Error('Password confirmation does not match password.')
      }
      return true
    })
  ],
  validateMiddleware,
  (req: Request<unknown, unknown, RegisterUserDto>, res: Response, next: NextFunction) => authController.register(req, res, next)
)

router.post('/login', (req: Request<unknown, unknown, CredentialsDto>, res: Response, next: NextFunction) => authController.login(req, res, next))

router.get('/logout', (req: Request, res: Response) => authController.logout(req, res))

export default router

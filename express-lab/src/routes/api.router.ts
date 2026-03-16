import authRouter from '@auth/presentation/auth.controller.ts'
import usersRouter from '@user/presentation/user.controller.ts'
import mailRouter from '@mail/presentation/mail.controller.ts'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/mail', mailRouter)

export default router

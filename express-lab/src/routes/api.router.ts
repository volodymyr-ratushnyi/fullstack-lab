import authRouter from '@auth/presentation/auth.controller.ts'
import usersRouter from '@user/presentation/user.controller.ts'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)

export default router

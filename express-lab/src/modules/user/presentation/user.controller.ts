import {userQueryRepository} from '@db/user'
import {authMiddleware} from 'src/middlewares/auth.middleware.ts'
import {type Request, type Response, Router} from 'express'

const router = Router()

router.use(authMiddleware)

router.get('/', async (req: Request, res: Response) => {
  const users = await userQueryRepository.getUsers()
  res.status(200).json(users)
})

router.get('/profile', async (req: Request, res: Response) => {
  const user = await userQueryRepository.getUserById(req.user?.id)
  res.status(200).json(user)
})

export default router

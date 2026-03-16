import type {MailDto} from '@mail/dtos/mail.dto.ts'
import {sendEmail} from '@mail/services/mail.service.ts'
import {type NextFunction, type Request, type Response, Router} from 'express'

const router = Router()

router.post('/send', async (req: Request, res: Response, next: NextFunction) => {
  const mail: MailDto = req.body
  await sendEmail(mail)
    .then((sentMessageInfo) => {
      console.log(sentMessageInfo)
      res.status(200).json({message: 'Email successfully sent'})
    })
    .catch((err) => {
      next(err)
    })
})

export default router

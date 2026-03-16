import {googleMailAdapter} from '@mail/adapters/google-mail.adapter.ts'
import type {MailDto} from '@mail/dtos/mail.dto.ts'

export const sendEmail = async (dto: MailDto) => {
  return await googleMailAdapter.sendEmail(dto)
}

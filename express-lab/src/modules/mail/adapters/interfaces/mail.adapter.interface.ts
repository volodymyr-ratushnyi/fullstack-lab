import type {MailDto} from '@mail/dtos/mail.dto.ts'

export interface MailAdapter {
  sendEmail: <T>(dto: MailDto) => Promise<T>
}

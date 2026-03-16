import type {MailAdapter} from '@mail/adapters/interfaces/mail.adapter.interface.ts'
import {config} from '@mail/config/config.ts'
import nodemailer, {type Transporter, type SentMessageInfo } from 'nodemailer'
import type {MailDto} from '@mail/dtos/mail.dto.ts'

class GoogleMailAdapter implements MailAdapter {
  private transporter: Transporter

  constructor(user: string, pass: string) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    })
  }

  public async sendEmail (dto: MailDto): Promise<SentMessageInfo> {
    return await this.transporter.sendMail({
      from: config.google.app_email,
      to: dto.to,
      subject: dto.subject,
      html: dto.message,
    })
  }
}

export const googleMailAdapter = new GoogleMailAdapter(config.google.app_email, config.google.app_password)

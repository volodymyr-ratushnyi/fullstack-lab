import { MailDto } from 'src/mail/application/dtos/mail.dto';
import { MailAdapter } from 'src/mail/domain/mail.adapter';
import nodemailer, { type Transporter, type SentMessageInfo } from 'nodemailer';
import { AppConfigService } from 'src/shared/config/config.service';

export class GmailAdapter implements MailAdapter {
  private readonly transporter: Transporter;

  constructor(private readonly config: AppConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.googleAppEmail,
        pass: this.config.googleAppPassword,
      },
    });
  }

  async sendEmail(dto: MailDto): Promise<SentMessageInfo> {
    return await this.transporter.sendMail({
      from: this.config.googleAppEmail,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
    });
  }
}

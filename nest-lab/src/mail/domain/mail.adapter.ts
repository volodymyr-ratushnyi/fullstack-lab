import { MailDto } from 'src/mail/application/dtos/mail.dto';

export abstract class MailAdapter {
  sendEmail: <T>(dto: MailDto) => Promise<T>;
}

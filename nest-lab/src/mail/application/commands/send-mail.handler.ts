import { CommandHandler } from '@nestjs/cqrs';
import { SendMailCommand } from 'src/mail/application/commands/send-mail.command';
import { MailAdapter } from 'src/mail/domain/mail.adapter';

@CommandHandler(SendMailCommand)
export class SendMailHandler {
  constructor(private readonly mailAdapter: MailAdapter) {
  }

  async execute(command: SendMailCommand) {
    return await this.mailAdapter.sendEmail(command)
  }
}

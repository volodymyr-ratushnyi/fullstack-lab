import { Module } from '@nestjs/common';
import { MailAdapter } from 'src/mail/domain/mail.adapter';
import { GmailAdapter } from 'src/mail/infrastructure/adapters/gmail.adapter';

@Module({
  providers: [
    {
      provide: MailAdapter,
      useClass: GmailAdapter,
    },
  ],
})
export class MailModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { type MockInstance } from 'vitest';
import nodemailer, { type Transporter } from 'nodemailer';
import { GmailAdapter } from './gmail.adapter';
import { AppConfigService } from 'src/shared/config/config.service';
import { MailDto } from 'src/mail/application/dtos/mail.dto';

vi.mock('nodemailer');

describe('GmailAdapter', () => {
  let adapter: GmailAdapter;

  const mockConfig = {
    googleAppEmail: 'test@gmail.com',
    googleAppPassword: 'test-password',
  };

  const mockSendMail = vi.fn();
  const mockTransporter = { sendMail: mockSendMail } as unknown as Transporter;

  beforeEach(async () => {
    (nodemailer.createTransport as unknown as MockInstance).mockReturnValue(
      mockTransporter,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GmailAdapter,
        { provide: AppConfigService, useValue: mockConfig },
      ],
    }).compile();

    adapter = module.get<GmailAdapter>(GmailAdapter);
  });

  it('should be return sendMail', async () => {
    const dto: MailDto = {
      to: 'recipient@gmail.com',
      subject: 'Test Subject',
      text: 'Test text',
      html: '<p>Test html</p>',
    };
    const mockResult = { messageId: 'test-id' };

    mockSendMail.mockResolvedValue(mockResult);
    const result = await adapter.sendEmail(dto);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: mockConfig.googleAppEmail,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
    });
    expect(result).toEqual(mockResult);
  });
});

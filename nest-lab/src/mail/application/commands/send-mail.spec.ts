import { type Mocked } from 'vitest';
import { SendMailHandler } from './send-mail.handler';
import { SendMailCommand } from './send-mail.command';
import { MailAdapter } from 'src/mail/domain/mail.adapter';

describe('SendMailHandler', () => {
  let mailAdapter: Mocked<MailAdapter> = {
    sendEmail: vi.fn() as any,
  };
  let handler: SendMailHandler = new SendMailHandler(mailAdapter);

  it('should return the result from mailAdapter.sendEmail', async () => {
    const command = new SendMailCommand(
      'test@example.com',
      'Test Subject',
      'Test text',
      '<p>Test html</p>',
    );
    const mockResult = { messageId: 'mock-id' };

    mailAdapter.sendEmail.mockResolvedValue(mockResult);
    const result = await handler.execute(command);

    expect(mailAdapter.sendEmail).toHaveBeenCalledTimes(1);
    expect(mailAdapter.sendEmail).toHaveBeenCalledWith(command);
    expect(result).toBe(mockResult);
  });
});

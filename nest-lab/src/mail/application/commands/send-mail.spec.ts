import { type Mocked } from 'vitest';
import { SendMailHandler } from './send-mail.handler';
import { SendMailCommand } from './send-mail.command';
import { MailAdapter } from 'src/mail/domain/mail.adapter';

describe('SendMailHandler', () => {
  let handler: SendMailHandler;
  let mailAdapter: Mocked<MailAdapter>;

  beforeEach(() => {
    mailAdapter = {
      sendEmail: vi.fn() as any,
    };

    handler = new SendMailHandler(mailAdapter);
  });

  it('should call mailAdapter.sendEmail with the command', async () => {
    const command = new SendMailCommand(
      'test@example.com',
      'Test Subject',
      'Test text',
      '<p>Test html</p>',
    );

    mailAdapter.sendEmail.mockResolvedValue({ messageId: 'mock-id' });

    await handler.execute(command);

    expect(mailAdapter.sendEmail).toHaveBeenCalledTimes(1);
    expect(mailAdapter.sendEmail).toHaveBeenCalledWith(command);
  });

  it('should return the result from mailAdapter.sendEmail', async () => {
    const command = new SendMailCommand(
      'test@example.com',
      'Test Subject',
      'Test text',
    );

    const mockResult = { messageId: 'mock-id' };
    mailAdapter.sendEmail.mockResolvedValue(mockResult);

    const result = await handler.execute(command);

    expect(result).toBe(mockResult);
  });

  it('should work without optional html field', async () => {
    const command = new SendMailCommand(
      'test@example.com',
      'Test Subject',
      'Test text',
    );

    mailAdapter.sendEmail.mockResolvedValue({ messageId: 'mock-id' });

    await handler.execute(command);

    expect(mailAdapter.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test text',
        html: undefined,
      }),
    );
  });

  it('should propagate error if mailAdapter.sendEmail throws', async () => {
    const command = new SendMailCommand(
      'test@example.com',
      'Test Subject',
      'Test text',
    );

    mailAdapter.sendEmail.mockRejectedValue(new Error('SMTP error'));

    await expect(handler.execute(command)).rejects.toThrow('SMTP error');
  });
});

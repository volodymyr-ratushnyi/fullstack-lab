import { CommandBus, CommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from 'src/auth/applications/commands/register/register.command';
import { CreateUserCommand } from 'src/user/application/commands/create-user/create-user.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ firstName, lastName, username, email, password }: RegisterCommand) {
    await this.commandBus.execute(
      new CreateUserCommand(
        firstName,
        lastName,
        username,
        email,
        password,
      ),
    );
  }
}

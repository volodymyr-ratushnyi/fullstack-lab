import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Hasher } from 'src/shared/hasher/hasher';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../../domain/user.repository';
import { User } from '../../../domain/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { firstName, lastName, username, email, password } = command;
    const hashedPassword = await this.hasher.hash(password);
    const user = new User(firstName, lastName, username, email, hashedPassword);
    await this.userRepository.create(user);
  }
}
